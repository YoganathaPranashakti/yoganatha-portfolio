import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      // Separate, unrelated project that lives in this workspace.
      "gods-eye-view/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    // The stylesheet is loaded once in the root App Router layout, not per page.
    files: ["app/layout.tsx"],
    rules: { "@next/next/no-page-custom-font": "off" },
  },
];

export default config;
