// AI Frontend Agent Logic (Replaces Mock Planner)

import { ComponentRegistry } from "../components/fixed";

/* ==============================
   Types
============================== */

export type ComponentNode = {
  type: keyof typeof ComponentRegistry | "div" | "span" | "h1" | "p";
  props?: Record<string, any>;
  children?: (ComponentNode | string)[];
};

export type UIPlan = {
  layout: string;
  components: ComponentNode[];
  modificationType: "create" | "update";
};

export type GenerationResult = {
  plan: UIPlan;
  code: string;
  explanation: string;
  timestamp: number;
};

export const INITIAL_CODE = `// Ready to generate UI...`;

/* ==============================
   REAL AI PLANNER (Backend Call)
============================== */

export const aiPlanner = async (
  input: string
): Promise<UIPlan> => {
  const response = await fetch("/api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: input }),
  });

  if (!response.ok) {
    throw new Error("AI request failed");
  }

  const plan = await response.json();

  // Basic validation for safety
  if (!plan.layout || !Array.isArray(plan.components)) {
    throw new Error("Invalid AI response structure");
  }

  return plan;
};

/* ==============================
   DETERMINISTIC GENERATOR
============================== */

export const mockGenerator = (plan: UIPlan): string => {
  const stringifyNode = (
    node: ComponentNode | string,
    depth = 0
  ): string => {
    if (typeof node === "string") return `"${node}"`;

    const indent = "  ".repeat(depth);

    const propsStr = node.props
      ? Object.entries(node.props)
          .map(([k, v]) => {
            if (k === "style") return `style={${JSON.stringify(v)}}`;
            if (typeof v === "string") return `${k}="${v}"`;
            if (typeof v === "boolean") return v ? k : "";
            return `${k}={${JSON.stringify(v)}}`;
          })
          .join(" ")
      : "";

    if (!node.children || node.children.length === 0) {
      return `\n${indent}<${node.type} ${propsStr} />`;
    }

    const childrenStr = node.children
      .map((c) => stringifyNode(c, depth + 1))
      .join("");

    return `\n${indent}<${node.type} ${propsStr}>${childrenStr}\n${indent}</${node.type}>`;
  };

  return plan.components.map((c) => stringifyNode(c)).join("\n");
};

/* ==============================
   EXPLAINER (Deterministic)
============================== */

export const mockExplainer = (plan: UIPlan): string => {
  if (plan.layout === "sidebar-main") {
    return `I've generated a dashboard layout with sidebar navigation and structured content cards.

Rationale:
- Sidebar provides persistent navigation.
- Cards group related metrics for clarity.
- Structured layout ensures clean separation of concerns.`;
  }

  if (plan.layout === "centered") {
    return `I've created a centered layout commonly used for authentication or single-action interfaces.

Rationale:
- Centering improves focus.
- Card container visually groups inputs.
- Clear call-to-action button included.`;
  }

  if (plan.layout === "modal") {
    return `A modal layout was generated to isolate a focused interaction.

Rationale:
- Modal keeps context.
- Primary and secondary actions included.
- Structured for usability.`;
  }

  if (plan.layout === "blank") {
    return `The AI returned an empty or unsupported structure. Try refining your prompt.`;
  }

  return `The UI was generated dynamically using AI planning while preserving strict component determinism.`;
};
