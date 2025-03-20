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
        if($data['criminal_record']){
            if($data['ethical_integrity'] < 50){
                if($data['regulatory_violations']){
                    return 100;//max risk
                }
                return 90;//very high risk
            } else {
                if($data['online_professional_reputation'] < 40){
                    return 80;//ok, but not bad reputation
                }
                return 70;// still high risk
            }
        } else {
            if($data['regulatory_violations']){
               if($data['ethical_integrity'] < 60){
                    return 75;//ok, but not bad reputation
                } else {
                    if($data['loyalty'] < 40){
                        return 65;//goot ethics but low loyalty
                    }
                    return 50;// still high risk
                }
                
               } else {
                if($data['job_tenure'] < 30){
                    if($data['online_professional_reputation'] < 40){
                        return 60;//moderate high risk
                    }
                    if(!$data['professional_references']){
                        return 50;//moderate high risk
                    }
                    return 40;//low tenure but ok reputation
                } else {
                    if($data['loyalty'] < 50){
                        if($data['ethical_integrity'] < 60){
                            return 45;//moderate high risk
                        }
                        return 35;//okay ethics but low loyalty
                    } else {
                        if($data['online_professional_reputation'] < 50){
                            return 30;//good loyalty but weak reputation 
                        }
                        return 15;//low risk
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