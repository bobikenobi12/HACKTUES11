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
    $analysis = ""; 

    if ($data['criminal_record']) {
        if ($data['ethical_integrity'] < 50) {
            if ($data['regulatory_violations']) {
                $analysis = "Maximum risk: Criminal record, low ethical integrity, and regulatory violations.";
                return ['score' => 100, 'analysis' => $analysis];
            }
            if ($data['online_professional_reputation'] < 40) {
                $analysis = "Criminal record and low ethical integrity combined with a poor online reputation.";
                return ['score' => 90, 'analysis' => $analysis];
            }
            $analysis = "Criminal record and low ethical integrity increase the risk significantly.";
            return ['score' => 80, 'analysis' => $analysis];
        } else { // Ethical Integrity is 50 or higher
            if ($data['online_professional_reputation'] < 40) {
                $analysis = "Criminal record present, ethical integrity acceptable, but online reputation is weak.";
                return ['score' => 75, 'analysis' => $analysis];
            }
            $analysis = "Criminal record present but mitigated by ethical integrity and online reputation.";
            return ['score' => 65, 'analysis' => $analysis];
        }
    } else { // No Criminal Record → Go to next major risk factor
        if ($data['regulatory_violations']) {
            if ($data['ethical_integrity'] < 60) {
                $analysis = "Regulatory violations combined with low ethical integrity contribute to a high risk.";
                return ['score' => 70, 'analysis' => $analysis];
            } else {
                if ($data['loyalty'] < 40) {
                    $analysis = "Regulatory violations present, ethical integrity is acceptable, but low loyalty raises concerns.";
                    return ['score' => 60, 'analysis' => $analysis];
                }
                $analysis = "Regulatory violations present, but ethical integrity and loyalty are acceptable.";
                return ['score' => 50, 'analysis' => $analysis];
            }
        } else { // No Criminal + No Regulatory Violations → Evaluate Job History
            if ($data['job_tenure'] < 30) {
                if ($data['online_professional_reputation'] < 40) {
                    $analysis = "Short job tenure combined with a poor online reputation suggests potential risk.";
                    return ['score' => 55, 'analysis' => $analysis];
                }
                if ($data['professional_references'] < 40) {
                    $analysis = "Short job tenure and weak professional references increase risk.";
                    return ['score' => 50, 'analysis' => $analysis];
                }
                $analysis = "Short job tenure, but online reputation and references are acceptable.";
                return ['score' => 45, 'analysis' => $analysis];
            } else { // Job Tenure is good → Evaluate Loyalty & Ethics
                if ($data['loyalty'] < 50) {
                    if ($data['ethical_integrity'] < 60) {
                        $analysis = "Low loyalty and moderate ethical integrity indicate some risk.";
                        return ['score' => 40, 'analysis' => $analysis];
                    }
                    $analysis = "Loyalty is low, but ethical integrity is acceptable.";
                    return ['score' => 30, 'analysis' => $analysis];
                } else { // Loyalty is Good → Evaluate Online Reputation
                    if ($data['online_professional_reputation'] < 50) {
                        $analysis = "Good loyalty but weak online reputation slightly increases risk.";
                        return ['score' => 25, 'analysis' => $analysis];
                    }
                    $analysis = "Strong loyalty, good ethical integrity, and a solid professional reputation result in low risk.";
                    return ['score' => 10, 'analysis' => $analysis];
                }
            }
        }
    }
}


private function calculateEmployeeEfficiency($data)
{
   
}


    private function calculateRiskOfEmployeeTurnover($data)
    {
       
    }

    private function calculateEmployeeReputation($data)
    {
       
    }

    private function calculateCareerGrowthPotential($data)
    {

    }
       
}