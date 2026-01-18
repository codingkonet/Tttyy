
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AIConsultant from './components/AIConsultant';
import { AppTab, Transaction } from './types';

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Monthly Salary', amount: 5000, type: 'income', category: 'Salary', date: '2024-06-01' },
  { id: '2', description: 'Rent Payment', amount: 1500, type: 'expense', category: 'Housing', date: '2024-06-02' },
  { id: '3', description: 'Grocery Store', amount: 120, type: 'expense', category: 'Food', date: '2024-06-05' },
  { id: '4', description: 'Internet Bill', amount: 80, type: 'expense', category: 'Utilities', date: '2024-06-10' },
  { id: '5', description: 'Freelance Gig', amount: 800, type: 'income', category: 'Salary', date: '2024-06-15' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('gpro_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem('gpro_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t: Transaction) => {
    setTransactions(prev => [...prev, t]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard transactions={transactions} />;
      case AppTab.TRANSACTIONS:
        return (
          <TransactionList 
            transactions={transactions} 
            onAddTransaction={addTransaction} 
            onDeleteTransaction={deleteTransaction}
          />
        );
      case AppTab.ADVISOR:
        return <AIConsultant transactions={transactions} />;
      case AppTab.BUDGETS:
        return (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Budget Goals Coming Soon</h2>
            <p className="text-slate-500">We're building a tool to help you track category limits with AI notifications.</p>
            <div className="mt-8 flex justify-center">
              <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-indigo-500 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard transactions={transactions} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
