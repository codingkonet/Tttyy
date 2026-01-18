
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: string;
}

export interface CategoryBudget {
  category: string;
  limit: number;
  spent: number;
}

export interface FinancialAdvice {
  summary: string;
  tips: string[];
  warnings: string[];
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  TRANSACTIONS = 'transactions',
  ADVISOR = 'advisor',
  BUDGETS = 'budgets'
}
