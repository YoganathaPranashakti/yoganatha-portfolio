import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters.").max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(160, "Email is too long."),
  subject: z.string().trim().min(3, "Please add a short subject.").max(120, "Subject is too long."),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(2000, "Message is too long."),
  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens."),
  description: z.string().trim().min(1, "Description is required."),
  category: z.string().trim().min(1, "Category is required."),
  technologies: z.string(),
  features: z.string(),
  challenges: z.string(),
  solutions: z.string(),
  results: z.string(),
  objectives: z.string(),
  process: z.string(),
  overview: z.string(),
  problem: z.string(),
  role: z.string(),
  thumbnail: z.string(),
  gallery: z.string(),
  live_url: z.string(),
  github_url: z.string(),
  featured: z.boolean(),
  published: z.boolean(),
});

export function splitList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
