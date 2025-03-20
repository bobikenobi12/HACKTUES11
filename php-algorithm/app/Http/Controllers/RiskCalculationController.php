<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RiskCalculationController extends Controller
{
    public function calculateMetrics(Request $request)
    {
        $data = [
            'loyalty' => $request->input('loyalty', 50),
            'ethical_integrity' => $request->input('ethical_integrity', 50),
            'job_tenure' => $request->input('job_tenure', 50),
            'professional_references' => $request->input('professional_references', 50),
            'online_professional_reputation' => $request->input('online_professional_reputation', 50),
            'criminal_record' => $request->input('criminal_record', 0),
            'regulatory_violations' => $request->input('regulatory_violations', 0),
            'work_experience_level' => $request->input('work_experience_level', 50),
            'certifications_achieved' => $request->input('certifications_achieved', 50),
            'education_level' => $request->input('education_level', 50),
            'career_progression' => $request->input('career_progression', 50),
            'leadership_experience' => $request->input('leadership_experience', 50),
            'career_stability' => $request->input('career_stability', 50),
            'salary_history' => $request->input('salary_history', 50),
            'employment_gaps' => $request->input('employment_gaps', 0),
            'linkedin_recommendations' => $request->input('linkedin_recommendations', 50),
        ];

        return response()->json([
            'risk_of_bribery' => round($this->calculateRiskOfBribery($data), 2),
            'employee_efficiency' => round($this->calculateEmployeeEfficiency($data), 2),
            'risk_of_employee_turnover' => round($this->calculateRiskOfEmployeeTurnover($data), 2),
            'employee_reputation' => round($this->calculateEmployeeReputation($data), 2),
            'career_growth_potential' => round($this->calculateCareerGrowthPotential($data), 2),
        ]);
    }

    private function calculateRiskOfBribery($data)
    {
        $score = ($data['loyalty'] * $data['ethical_integrity']) / 150
               + ($data['job_tenure'] * $data['professional_references']) / 200
               + ($data['online_professional_reputation'] / 3)
               - ($data['criminal_record'] * 50 + $data['regulatory_violations'] * 75);
        return max(min($score, 100), 0);
    }

    private function calculateEmployeeEfficiency($data)
    {
        $score = ($data['work_experience_level'] * $data['certifications_achieved']) / 150
               + ($data['education_level'] * $data['job_tenure']) / 200
               + ($data['career_progression'] * 0.8)
               + ($data['leadership_experience'] * 25);
        return log($score + 1) * (100 / log(500 + 1));
    }

    private function calculateRiskOfEmployeeTurnover($data)
    {
        $score = ($data['job_tenure'] * $data['loyalty']) / 200
               + ($data['career_stability'] * $data['salary_history']) / 200
               - ($data['employment_gaps'] * 30);
        return 100 - max(min($score, 100), 0);
    }

    private function calculateEmployeeReputation($data)
    {
        $score = ($data['ethical_integrity'] * $data['professional_references']) / 150
               + ($data['online_professional_reputation'] * $data['linkedin_recommendations']) / 200
               - ($data['criminal_record'] * 30);
        return max(min($score, 100), 0);
    }

    private function calculateCareerGrowthPotential($data)
    {
        $initialScore = ($data['certifications_achieved'] * $data['education_level']) / 100
                      + ($data['work_experience_level'] * $data['career_progression']) / 100
                      + ($data['leadership_experience'] * 10);
        return log($initialScore + 1) * (100 / log(600 + 1));
    }
}