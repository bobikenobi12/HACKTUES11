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

private function calculateRiskOfBribery($data) {
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


private function calculateEmployeeEfficiency($data) {
    $analysis = ""; 

    if ($data['leadership_experience'] > 70) {
        if ($data['work_experience_level'] > 70) {
            if ($data['certifications_achieved'] > 50) {
                if ($data['education_level'] > 60) {
                    $analysis = "Highly experienced, certified, and well-educated leader.";
                    return ['score' => 100, 'analysis' => $analysis];
                }
                $analysis = "Highly experienced leader with strong certifications.";
                return ['score' => 90, 'analysis' => $analysis];
            } else {
                $analysis = "Strong leader but certifications are lacking.";
                return ['score' => 80, 'analysis' => $analysis];
            }
        } else { // Work Experience Level is not very high
            if ($data['job_tenure'] > 60) {
                $analysis = "Long-term employee with strong leadership but lower experience.";
                return ['score' => 75, 'analysis' => $analysis];
            }
            $analysis = "Leadership present but experience and tenure are lacking.";
            return ['score' => 65, 'analysis' => $analysis];
        }
    } else { // Leadership Experience is below 70
        if ($data['work_experience_level'] > 50) {
            if ($data['certifications_achieved'] > 50) {
                if ($data['career_progression'] > 60) {
                    $analysis = "Moderate experience with growth and certifications.";
                    return ['score' => 70, 'analysis' => $analysis];
                }
                $analysis = "Moderate experience and certifications but low career growth.";
                return ['score' => 60, 'analysis' => $analysis];
            } else { // Low Certifications
                if ($data['education_level'] > 50) {
                    $analysis = "Educated but lacks leadership and certifications.";
                    return ['score' => 55, 'analysis' => $analysis];
                }
                $analysis = "Neither leadership nor strong credentials.";
                return ['score' => 45, 'analysis' => $analysis];
            }
        } else { // Work Experience Level is low
            if ($data['job_tenure'] < 40) {
                $analysis = "Low experience, low tenure → Inefficient employee.";
                return ['score' => 30, 'analysis' => $analysis];
            }
            if ($data['career_progression'] < 40) {
                $analysis = "No experience, no career growth → Very inefficient.";
                return ['score' => 25, 'analysis' => $analysis];
            }
            $analysis = "Overall weak employee efficiency.";
            return ['score' => 20, 'analysis' => $analysis];
        }
    }
}


private function calculateRiskOfEmployeeTurnover($data)
{
    $analysis = ""; // Initialize analysis message

    // Root Node: Job Tenure
    if ($data['job_tenure'] < 30) {
        if ($data['employment_gaps'] > 50) {
            if ($data['loyalty'] < 40) {
                $analysis = "High turnover risk: Short job tenure, frequent employment gaps, and low loyalty.";
                return ['score' => 90, 'analysis' => $analysis];
            }
            $analysis = "Moderate to high turnover risk: Short job tenure and frequent employment gaps.";
            return ['score' => 80, 'analysis' => $analysis];
        } else { // Employment Gaps are not high
            if ($data['career_stability'] < 40) {
                $analysis = "High turnover risk due to short job tenure and unstable career history.";
                return ['score' => 75, 'analysis' => $analysis];
            }
            if ($data['salary_history'] < 50) {
                $analysis = "Job tenure is short, but career stability is moderate. Salary inconsistency adds risk.";
                return ['score' => 70, 'analysis' => $analysis];
            }
            $analysis = "Short job tenure is a concern, but career stability and salary history are reasonable.";
            return ['score' => 65, 'analysis' => $analysis];
        }
    } else { // Job tenure is 30 or more
        if ($data['loyalty'] < 40) {
            if ($data['career_stability'] < 50) {
                $analysis = "Moderate turnover risk: Long job tenure, but low loyalty and unstable career history.";
                return ['score' => 60, 'analysis' => $analysis];
            }
            if ($data['employment_gaps'] > 50) {
                $analysis = "Moderate turnover risk: Long tenure, but frequent employment gaps.";
                return ['score' => 55, 'analysis' => $analysis];
            }
            $analysis = "Low to moderate risk: Employee has long tenure but exhibits low loyalty.";
            return ['score' => 50, 'analysis' => $analysis];
        } else { // Loyalty is 40 or higher
            if ($data['career_stability'] < 50) {
                $analysis = "Low turnover risk: Good loyalty, but career history suggests some instability.";
                return ['score' => 40, 'analysis' => $analysis];
            }
            if ($data['employment_gaps'] > 50) {
                $analysis = "Low turnover risk: Good loyalty and stable career, but some employment gaps.";
                return ['score' => 35, 'analysis' => $analysis];
            }
            if ($data['salary_history'] > 60) {
                $analysis = "Very low turnover risk: Employee has long tenure, strong loyalty, and good salary history.";
                return ['score' => 20, 'analysis' => $analysis];
            }
            $analysis = "Very low turnover risk: Employee has long tenure and exhibits high loyalty.";
            return ['score' => 15, 'analysis' => $analysis];
        }
    }
}


    private function calculateEmployeeReputation($data)
    {
       
    }

    private function calculateCareerGrowthPotential($data)
    {

    }
       
}