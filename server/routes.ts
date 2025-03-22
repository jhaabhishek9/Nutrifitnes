import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { dietPlans } from "@shared/schema";

// Sample diet plans data
const sampleDietPlans = [
  {
    name: "Basic Plan",
    description: "A great starter plan for beginners",
    priceINR: 5000,
    priceUSD: 60,
    features: [
      "Personalized Diet Plan",
      "Weekly Follow-ups via Chat",
      "Basic Nutrition Guide"
    ],
    popular: false
  },
  {
    name: "Premium Plan",
    description: "Our most popular comprehensive plan",
    priceINR: 12000,
    priceUSD: 145,
    features: [
      "Customized Diet Plan",
      "Bi-weekly Video Follow-ups",
      "Comprehensive Nutrition Guide",
      "2 1-on-1 Consultations",
      "Basic Workout Recommendations"
    ],
    popular: true
  },
  {
    name: "Elite Plan",
    description: "Advanced plan for serious fitness enthusiasts",
    priceINR: 25000,
    priceUSD: 300,
    features: [
      "Advanced Personalized Diet Plan",
      "Weekly Video Follow-ups",
      "Elite Nutrition & Supplement Guide",
      "4 1-on-1 Consultations",
      "Complete Workout Program"
    ],
    popular: false
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for deployment monitoring
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });
  
  // API version endpoint
  app.get("/api/version", (req, res) => {
    res.json({ 
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development" 
    });
  });
  
  // sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Diet Plans API
  app.get("/api/diet-plans", (req, res) => {
    res.json(sampleDietPlans);
  });

  // Calculate BMI API
  app.post("/api/calculate-bmi", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to save BMI data" });
    }

    const { heightFeet, heightInches, weight } = req.body;
    
    // Convert height to meters: (feet * 12 + inches) * 0.0254
    const totalInches = (Number(heightFeet) * 12) + Number(heightInches);
    const heightMeters = totalInches * 0.0254;
    
    // Calculate BMI: weight(kg) / (height(m) * height(m))
    const bmiValue = Number(weight) / (heightMeters * heightMeters);
    
    // Determine BMI category
    let category = '';
    
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue < 25) {
      category = 'Normal';
    } else if (bmiValue < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    
    // Return BMI calculation
    res.json({ 
      bmi: bmiValue.toFixed(1), 
      category,
      heightMeters,
      weightKg: weight
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
