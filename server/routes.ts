import type { Express } from "express";
import type { Server } from "http";
import { generatePlan } from "./ai";

export async function registerRoutes(
  server: Server,
  app: Express
) {

  app.post("/api/plan", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt required" });
      }

      const plan = await generatePlan(prompt);

      return res.json(plan);

    } catch (error) {
      console.error("Route error:", error);
      return res.status(500).json({
        error: "Backend or AI error occurred.",
      });
    }
  });

}
