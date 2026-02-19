# Deterministic UI Builder

A production-quality local web app that converts natural language into structured UI plans and deterministic React code using a fixed component library.

## 🧠 Project Goal

To build a prompt-driven UI system that follows the pipeline:
**Natural language → Structured UI plan → Deterministic React code → Live preview**

This system strictly adheres to constraints:
- Uses a **Fixed Component Library** (Button, Card, Input, etc.)
- Never generates new components
- Never generates CSS (uses static `preview.css`)
- Never uses inline styles or Tailwind in generated output
- Only composes existing components

## 🧱 Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS (for the tool itself)
- **Agent Logic**: Client-side mock implementation
- **State Management**: React State (In-memory)
- **Styling**: 
  - Tool Interface: Tailwind CSS
  - Generated UI: Plain CSS (`preview.css`) via deterministic class names

## 🧩 Architecture

The system is built on a three-stage pipeline:

### 1️⃣ Planner
- **Input**: User prompt
- **Output**: JSON Structure (Layout, Components tree)
- **Role**: Selects layout and components. Does NOT write code.

### 2️⃣ Generator
- **Input**: Planner JSON
- **Output**: Valid React JSX String
- **Role**: Maps the JSON plan to the whitelisted component registry. strictly deterministic.

### 3️⃣ Explainer
- **Input**: Planner JSON
- **Output**: Plain English explanation
- **Role**: Explains design decisions and rationale.

## 🛡️ Component Determinism Strategy

To ensure absolute determinism and safety:
1. **Registry Map**: All allowed components are exported from `client/src/components/fixed/index.tsx`.
2. **Strict Rendering**: The `PreviewPanel` only renders components that exist in the `ComponentRegistry`. Unknown types are rejected or flagged as errors.
3. **Static Styling**: All generated components use strict class names (e.g., `.fc-button`, `.fc-card`) defined in `client/src/preview.css`. The generator cannot invent new styles.

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev:client
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5000`

## 🧪 Usage

1. Type a prompt in the left panel (e.g., "Create a dashboard with charts").
2. The Agent will:
   - **Plan**: Decide on a Sidebar layout with Cards and Charts.
   - **Generate**: Produce the React JSX code shown in the middle panel.
   - **Render**: Show the live interactive component in the right panel.
   - **Explain**: Provide reasoning for the layout choice.

## ⚠️ Known Limitations (Mockup Mode)

- **Backend**: The Node.js/Express backend logic is simulated on the client-side for this prototype.
- **Prompt Engine**: Uses a heuristic mock (`agent-mock.ts`) that responds to specific keywords like "dashboard", "login", "modal".
- **Persistence**: Data is not saved to a database; it resets on refresh.

## 🔮 Future Improvements

- Integrate a backend planning service for more flexible prompt interpretation.
- Implement the backend filesystem storage for version history.
- Add "Diff Viewer" to visually show changes between versions.
- Support streaming responses for a real-time "typing" effect.
