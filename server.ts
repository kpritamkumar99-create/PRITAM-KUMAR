import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Ensure standard process env lookup
const apiKey = process.env.GEMINI_API_KEY || "";

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize client to prevent startup failure if key is missing
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("⚠️ GEMINI_API_KEY is not set in environment variables. Custom AI script generator will show demo info.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!apiKey,
    time: new Date().toISOString()
  });
});

// Endpoint to generate a customized video script using Gemini AI
app.post("/api/generate-custom-script", async (req, res) => {
  try {
    const { videoTitle, originalConcept, niche, targetAudience, tone } = req.body;

    if (!videoTitle || !niche) {
      res.status(400).json({ error: "Missing required fields: videoTitle and niche are required." });
      return;
    }

    const ai = getAiClient();

    if (!ai) {
      // Return beautiful mock response tailored to the user's input so their UI doesn't break
      // if they haven't set up an API key, or show placeholder content.
      const mockResult = {
        hook: `🔥 "Stop running your ${niche} manual tasks like it's 2012. Let me show you how to automate..."`,
        script: `[Camera: Dynamic Zoom inside Content Studio]
Hey guys! If you run a ${niche} business and you're still manually replying to leads, scheduling appointments, or copy-pasting client data, you are literally throwing cash away. 

[Point to laptop displaying automation workflows]
We just deployed a seamless AI workflow using Make.com and ChatGPT that captures requests, schedules them, and drafts customized responses in under 2.3 seconds. 

[Point directly to camera with intense founder energy]
Here is the deal: if you want to scale to ₹10L/month with 0 extra staff, comment 'UPGRADE' below and I'll send you our blueprint for free. Let's build!`,
        shotBreakdown: [
          "Shot 1: Ultra close-up of developer mechanical keyboard with blue RGB backdrop. Text on screen: 'MANUAL IS DEAD'.",
          "Shot 2: Medium close face video. Smiling creator pointing over left shoulder.",
          "Shot 3: Screen recording highlighting visual triggers firing in WhatsApp API.",
          "Shot 4: High angle zoom out showing lifestyle workspace with beverage and clean aesthetic."
        ],
        clientStrategy: `A Whatsapp bot setup is high-value for ${niche}. Offer a "Free 15-Minute Automation Audit" in your bio. When prospects comment 'UPGRADE', send them an automated voice intro and book them on a call.`,
        hashtags: `#${niche.replace(/\s+/g, '')} #AIAutomation #AgencyOuteach #NoCodeIndia #FutureFounder`,
        bRollSuggestions: "Satisfying RGB lighting transitions, high-speed clicking, neat visual canvas of automation map, workspace panning shot",
        caption: `Stop wasting hours on repetitive administrative work for your ${niche} business. Here is how advanced AI automations solve this in 3 quick steps. Click the link in bio to book a free optimization call! 👇`
      };

      res.json({
        customized: true,
        data: mockResult,
        isDemoMode: true,
        message: "Demo fallback triggered because GEMINI_API_KEY is missing. Add your API key in Settings > Secrets to unlock live AI generation!"
      });
      return;
    }

    const systemInstruction = `You are Pritam Kumar, a world-class AI Automation Agency (AAA) founder, elite short-form video creator, and content strategist. 
Your goal is to customize a high-quality viral reel script for the user's specific agency niche, target audience, and chosen brand tone.
Your response MUST be valid JSON conforming strictly to the requested schema. Return the results in Hindi-English mixed (Hinglish) with highly motivational, modern, startup-centric energy.`;

    const prompt = `Please customize the video idea "${videoTitle}" (Original concept: "${originalConcept}") for the following niche: "${niche}".
Target Audience: "${targetAudience || "Business owners, startups, or local service founders"}"
Brand Tone: "${tone || "Powerful, magnetic, cinematic, informative"}"

Write a highly engaging, high-conversion short video script (designed for Instagram Reels, YouTube Shorts, or TikTok).

Make sure the output includes:
1. An ultra-viral scroll-stopping hook (Hinglish/Hinglish-English mix, first 3 seconds, high energy).
2. The full speaking script with stage/camera directions and high conversion call-to-action (CTA).
3. A detailed shot-by-shot breakdown (at least 4 shots) with camera angles and B-roll guidance.
4. Client conversion strategy tailored specifically for selling AI Automation Agency (AAA) services to a ${niche} business.
5. Viral caption text and context-aware hashtags.
6. Highly visual b-roll suggestions to insert.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["hook", "script", "shotBreakdown", "clientStrategy", "hashtags", "bRollSuggestions", "caption"],
          properties: {
            hook: {
              type: Type.STRING,
              description: "The viral hook of the video, first 3 seconds to grab attention instantly. Hinglish."
            },
            script: {
              type: Type.STRING,
              description: "The complete vocal script including timestamps or physical cues. Engaging and fast-paced Hinglish."
            },
            shotBreakdown: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 4 shot instructions detailing action, camera angle, and B-Roll suggestions."
            },
            clientStrategy: {
              type: Type.STRING,
              description: "Actionable tactic for converting the viral attention from this reel into paying retainer clients for agency."
            },
            hashtags: {
              type: Type.STRING,
              description: "A space-separated list of 5-8 highly relevant hashtags including #AIAutomation style tags."
            },
            bRollSuggestions: {
              type: Type.STRING,
              description: "Details on what visually compelling b-roll should be added for editorial feel."
            },
            caption: {
              type: Type.STRING,
              description: "A ready-to-copy social media caption that creates desire and ends with a clear CTA to DM or click bio."
            }
          }
        }
      }
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText.trim());
    res.json({
      customized: true,
      data,
      isDemoMode: false
    });

  } catch (error: any) {
    console.error("Gemini script generation error:", error);
    res.status(500).json({
      error: "Failed to generate customized script.",
      details: error.message || String(error)
    });
  }
});

// ----------------------------------------------------
// VITE OR STATIC MIDDLEWARE SETUP
// ----------------------------------------------------

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development server with Vite Dev Server Middleware
    console.log("⚙️ Starting development server with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static files server
    const distPath = path.join(process.cwd(), "dist");
    console.log(`🚀 Starting production server serving from: ${distPath}`);
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to port 3000 as required by the infrastructure
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🟢 Complete Ultra-Premium Server listening on http://localhost:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("🔴 Failed to setup server:", err);
});
