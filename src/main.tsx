import type { MathfieldElement } from "mathlive";
import { DetailedHTMLProps, HTMLAttributes, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": DetailedHTMLProps<
        HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
