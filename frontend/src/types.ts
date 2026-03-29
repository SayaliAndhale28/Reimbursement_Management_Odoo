export type UserRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId: string;
  managerId?: string;
}

export interface Company {
  id: string;
  name: string;
  currency: string;
}

export type ExpenseStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Expense {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: string;
  receiptUrl?: string;
  status: ExpenseStatus;
  comment?: string;
  createdAt: string;
}

export interface WorkflowStep {
  id: string;
  approverId?: string; // Specific approver
  role?: UserRole; // Role-based approver
  minAmount?: number;
  percentageApproval?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
