import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // The design language for this site intentionally renders literal
      // "// LABEL" text as UI copy (coding/terminal aesthetic), which this
      // rule mistakes for a stray JS comment left inside JSX.
      "react/jsx-no-comment-textnodes": "off",
      // BookingProvider intentionally hydrates state from localStorage
      // once on mount (data is only available client-side) — a standard,
      // safe use of setState-in-effect for external-store sync.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
