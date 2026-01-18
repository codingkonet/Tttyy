
import React, { useState } from 'react';
import { Transaction, FinancialAdvice } from '../types';
import { getFinancialInsights } from '../services/geminiService';

interface AIConsultantProps {
  transactions: Transaction[];
}

const AIConsultant: React.FC<AIConsultantProps> = ({ transactions }) => {
  const [advice, setAdvice] = useState<FinancialAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateAdvice = async () => {
    if (transactions.length === 0) return;
    setIsLoading(true);
    try {
      const result = await getFinancialInsights(transactions);
      setAdvice(result);
    } catch (error) {
      console.error(error);
      alert("The AI is currently contemplating market fluctuations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-4xl mb-4 border border-white/30 animate-pulse">
            🤖
          </div>
          <h2 className="text-3xl font-bold mb-2">Gemini Pro Advisor</h2>
          <p className="text-indigo-100 max-w-md mb-8">
            Let our AI analyze your spending patterns and provide customized recommendations to help you save more.
          </p>
          <button
            onClick={generateAdvice}
            disabled={isLoading || transactions.length === 0}
            className="bg-white text-indigo-700 px-8 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Analyzing Finances...' : 'Generate New Insights'}
          </button>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
      </div>

      {advice && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-700 slide-in-from-bottom-4">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="mr-2">📝</span> Summary
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {advice.summary}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="mr-2">💡</span> Savings Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advice.tips.map((tip, i) => (
                  <div key={i} className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-sm font-medium">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="mr-2">⚠️</span> Attention Areas
              </h3>
              <div className="space-y-3">
                {advice.warnings.map((warn, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
                    <span className="text-rose-500 mt-1">🚩</span>
                    <span className="text-rose-800 text-sm font-medium">{warn}</span>
                  </div>
                ))}
                {advice.warnings.length === 0 && <p className="text-slate-400 italic">No red flags detected!</p>}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
               <img src="https://picsum.photos/seed/finance/300/200" alt="Finance Tip" className="rounded-2xl mb-4" />
               <p className="text-xs text-slate-400">Education Tip of the Day: Compound interest is the 8th wonder of the world.</p>
            </div>
          </div>
        </div>
      )}

      {transactions.length === 0 && (
        <div className="text-center py-12 text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          Add some transactions first so Gemini has data to analyze!
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
