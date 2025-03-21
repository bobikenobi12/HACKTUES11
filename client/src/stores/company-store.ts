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
	removeEmployeeFromCompany: (employee: Employee) => void;
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
		const updatedCompanies = useCompanyStore
			.getState()
			.companies.map((company) => {
				if (company.id === selectedCompany.id) {
					return {
						...company,
						employees: [...company.employees, employee],
					};
				}
				return company;
			});
		set({
			companies: updatedCompanies,
			selectedCompany: {
				...selectedCompany,
				employees: [...selectedCompany.employees, employee],
			},
		});
	},
	removeEmployeeFromCompany: (employee: Employee) => {
		if (!employee) return;
		const selectedCompany = useCompanyStore.getState().selectedCompany;
		if (!selectedCompany) return;
		const updatedCompanies = useCompanyStore
			.getState()
			.companies.map((company) => {
				if (company.id === selectedCompany.id) {
					return {
						...company,
						employees: company.employees.filter(
							(emp) => emp.id !== employee.id
						),
					};
				}
				return company;
			});
		set({
			companies: updatedCompanies,
			selectedCompany: {
				...selectedCompany,
				employees: selectedCompany.employees.filter(
					(emp) => emp.id !== employee.id
				),
			},
		});
	},
	setSelectedCompany: (company: Company) => set({ selectedCompany: company }),
}));
