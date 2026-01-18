
import React, { useState } from 'react';
import { Transaction } from '../types';
import { categorizeTransaction } from '../services/geminiService';

interface TransactionListProps {
  transactions: Transaction[];
  onAddTransaction: (t: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onAddTransaction, 
  onDeleteTransaction 
}) => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSmartAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    try {
      const result = await categorizeTransaction(inputText);
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        description: result.description,
        amount: result.amount,
        type: result.type,
        category: result.category,
        date: new Date().toISOString().split('T')[0]
      };
      onAddTransaction(newTransaction);
      setInputText('');
    } catch (error) {
      console.error("Failed to parse transaction:", error);
      alert("AI couldn't process that. Try: 'Spent $12 on lunch at Taco Bell'");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Smart Input */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Smart Add</h3>
        <form onSubmit={handleSmartAdd} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type: 'Salary 5000' or 'Spent 45 on gas today'"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !inputText}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center min-w-[120px]"
          >
            {isProcessing ? (
              <span className="animate-spin mr-2">⏳</span>
            ) : 'Add'}
          </button>
        </form>
        <p className="text-xs text-slate-400 mt-2">✨ Powered by Gemini AI - understands natural language</p>
      </div>

      {/* History */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Recent Transactions</h3>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{transactions.length} total</span>
        </div>
        
        <div className="divide-y divide-slate-50">
          {transactions.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <span className="text-4xl block mb-2">💸</span>
              No transactions yet. Start by adding one above!
            </div>
          ) : (
            transactions.sort((a,b) => b.id.localeCompare(a.id)).map(t => (
              <div key={t.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {t.type === 'income' ? '↓' : '↑'}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{t.description}</p>
                    <p className="text-xs text-slate-500 flex items-center">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded mr-2">{t.category}</span>
                      {t.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className={`font-bold text-lg ${
                    t.type === 'income' ? 'text-emerald-600' : 'text-slate-800'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </p>
                  <button 
                    onClick={() => onDeleteTransaction(t.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
