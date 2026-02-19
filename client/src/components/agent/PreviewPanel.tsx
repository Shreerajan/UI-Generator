import React from "react";
import { ComponentRegistry } from "../fixed";
import "../../preview.css";

interface ComponentNode {
  type: string;
  props?: Record<string, any>;
  children?: (ComponentNode | string)[];
}

interface UIPlan {
  layout?: string;
  modificationType?: string;
  components?: ComponentNode[];
}

interface PreviewPanelProps {
  plan: UIPlan | null;
}

// Recursive renderer
const NodeRenderer = ({ node }: { node: ComponentNode | string }) => {
  if (typeof node === "string") {
    return <>{node}</>;
  }

  const { type, children, ...rest } = node;

  // If props exists use it, otherwise treat remaining keys as props
  const props = node.props ? node.props : rest;

  const Component =
    type === "div"
      ? "div"
      : type === "span"
      ? "span"
      : type === "p"
      ? "p"
      : type === "h1"
      ? "h1"
      : ComponentRegistry[type];

  if (!Component) {
    return (
      <div style={{ color: "red", border: "1px solid red", padding: 8 }}>
        Unknown component: {type}
      </div>
    );
  }

  return (
    <Component {...props}>
      {children?.map((child, i) => (
        <NodeRenderer key={i} node={child} />
      ))}
    </Component>
  );
};


export function PreviewPanel({ plan }: PreviewPanelProps) {
  // 🔥 Defensive fallback
  if (!plan || !Array.isArray(plan.components)) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        No valid UI plan received
      </div>
    );
  }

  if (plan.components.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        AI returned empty layout
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white overflow-auto relative custom-scrollbar">
      <div className="min-h-full">
        {plan.components.map((node, i) => (
          <NodeRenderer key={i} node={node} />
        ))}
      </div>
    </div>
  );
}
