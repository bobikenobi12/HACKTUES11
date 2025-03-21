import { create } from "zustand";

export interface AddEmployee {
	name: string;
	birth_date: string;
	risk_of_bribery: number;
	employee_efficiency: number;
	risk_of_employee_turnover: number;
	employee_reputation: number;
	career_growth_potential: number;
}

export interface Employee extends AddEmployee {
	id: string;
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
	addEmployeeToCompany: (employee: Employee) => void;
	setSelectedCompany: (company: Company) => void;
}
export const useCompanyStore = create<CompanyStore>((set) => ({
	companies: [],
	selectedCompany: null,
	setCompanies: (companies: Company[]) => set({ companies }),
	addEmployeeToCompany: (employee: Employee) => {
		if (!employee) return;
		const selectedCompany = useCompanyStore.getState().selectedCompany;
		if (!selectedCompany) return;
		const company: Company = {
			...selectedCompany,
			id: selectedCompany.id,
			name: selectedCompany.name,
			employees: selectedCompany.employees || [],
		};
		if (!company.employees) company.employees = [];
		company.employees.push(employee);
		set({ selectedCompany: company });
	},
	setSelectedCompany: (company: Company) => set({ selectedCompany: company }),
}));
