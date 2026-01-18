
import React from 'react';
import { Transaction } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

interface DashboardProps {
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Pie Chart Data - Expenses by Category
  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.keys(expenseByCategory).map(cat => ({
    name: cat,
    value: expenseByCategory[cat]
  }));

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f97316', '#10b981', '#3b82f6'];

  // Monthly Trend Data (Last 6 months placeholder logic)
  const monthlyData = [
    { name: 'Jan', income: 4500, expense: 3200 },
    { name: 'Feb', income: 4800, expense: 3500 },
    { name: 'Mar', income: 4200, expense: 4100 },
    { name: 'Apr', income: 5100, expense: 3800 },
    { name: 'May', income: 4900, expense: 3400 },
    { name: 'Jun', income: totalIncome, expense: totalExpenses },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">Total Balance</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">💰</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">${balance.toLocaleString()}</div>
          <div className="mt-2 text-xs text-green-600 font-medium">↑ 12% from last month</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">Monthly Income</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">📈</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">${totalIncome.toLocaleString()}</div>
          <div className="mt-2 text-xs text-emerald-600 font-medium">Steady growth</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">Monthly Expenses</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">📉</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">${totalExpenses.toLocaleString()}</div>
          <div className="mt-2 text-xs text-rose-600 font-medium">Watch your spending</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Bar dataKey="income" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="expense" fill="#fda4af" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieData.length > 0 ? pieData : [{name: 'No Data', value: 1}]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
