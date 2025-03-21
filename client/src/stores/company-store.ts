import { create } from "zustand";

export interface Employee {
	id: string;
	name: string;
	birth_date: string;
	risk_of_bribery: number;
	employee_efficiency: number;
	risk_of_employee_turnover: number;
	employee_reputation: number;
	career_growth_potential: number;
}

export interface Company {
	id: string;
	name: string;
	employees: Employee[];
}

export interface CompanyStore {
	companies: Company[];
	selectedCompany: Company | null;
	setCompanies: (companies: Company[]) => void;
	setSelectedCompany: (company: Company) => void;
}
export const useCompanyStore = create<CompanyStore>((set) => ({
	companies: [],
	selectedCompany: null,
	setCompanies: (companies: Company[]) => set({ companies }),
	setSelectedCompany: (company: Company) => set({ selectedCompany: company }),
}));
