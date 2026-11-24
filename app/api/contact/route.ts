import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Please check your input." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "The contact form is not configured yet. Please email the owner directly." },
        { status: 503 },
      );
    }

    const { name, email, subject, message } = parsed.data;
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
      is_read: false,
      is_replied: false,
      archived: false,
    });

    if (error) {
      console.error("Contact message insert failed:", error.message);
      return NextResponse.json(
        { error: "Your message could not be saved right now. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unexpected contact API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
