"use client";

import Navbar from "@/components/Navbar";
import FormPredict from "@/components/FormPredict";
import { PredictionProvider } from "@/context/PredictionContext";
import ResultCard from "@/components/ResultCard";
import InfoModel from "@/components/InfoModel";

export default function NeonatalPrediction() {
  return (
    <PredictionProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FormPredict />

            <div className="space-y-6 ">
              <ResultCard />
              <InfoModel />
            </div>
          </div>
        </main>
      </div>
    </PredictionProvider>
  );
}
