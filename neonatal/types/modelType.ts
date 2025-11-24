interface PredictionResult {
  prediction: "Died" | "Alive";
  risk_score: number;
  input_summary: unknown;
}

export type { PredictionResult };
