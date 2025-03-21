<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use OpenAI\Client;
use OpenAI\Transporter;
use OpenAI\Client as OpenAIClient;
use OpenAI;

class RiskCalculationController extends Controller
{

    private $analysis = [];

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
        $metrics = [
            'risk_of_bribery' => round($this->calculateRiskOfBribery($data), 2),
            'employee_efficiency' => round($this->calculateEmployeeEfficiency($data), 2),
            'risk_of_employee_turnover' => round($this->calculateRiskOfEmployeeTurnover($data), 2),
            'employee_reputation' => round($this->calculateEmployeeReputation($data), 2),
            'career_growth_potential' => round($this->calculateCareerGrowthPotential($data), 2),
        ];
        $adjusted_values = $this->adjustMetrics($data, $metrics);

        if (is_array($adjusted_values)) {
            $valid_adjusted_values = array_filter($adjusted_values, function($value) {
                return is_numeric($value) && $value >= 1 && $value <= 100;
            });

            if (count($valid_adjusted_values) === count($adjusted_values)) {
                return response()->json([
                    'metrics' => $adjusted_values,
                    'analysis' => $this->analysis,
                ]);
            }
        }

        return response()->json([
            'metrics' => $metrics,
            'analysis' => $this->analysis,
        ]);
    }

    private function calculateRiskOfBribery($data) {
        if ($data['criminal_record']) {
            if ($data['ethical_integrity'] < 50) {
                if ($data['regulatory_violations']) {
                    $this->analysis['risk_of_bribery'] = "Maximum risk: Criminal record, low ethical integrity, and regulatory violations.";
                    $score = 100;
                }
                if ($data['online_professional_reputation'] < 40) {
                    $this->analysis['risk_of_bribery'] = "Criminal record and low ethical integrity combined with a poor online reputation.";
                    $score = 90;
                }
                $this->analysis['risk_of_bribery'] = "Criminal record and low ethical integrity increase the risk significantly.";
                $score = 80;
            } else { // Ethical Integrity is 50 or higher
                if ($data['online_professional_reputation'] < 40) {
                    $this->analysis['risk_of_bribery'] = "Criminal record present, ethical integrity acceptable, but online reputation is weak.";
                    $score = 75;
                }
                $this->analysis['risk_of_bribery'] = "Criminal record present but mitigated by ethical integrity and online reputation.";
                $score = 65;
            }
        } else { // No Criminal Record → Go to next major risk factor
            if ($data['regulatory_violations']) {
                if ($data['ethical_integrity'] < 60) {
                    $this->analysis['risk_of_bribery'] = "Regulatory violations combined with low ethical integrity contribute to a high risk.";
                    $score = 70;
                } else {
                    if ($data['loyalty'] < 40) {
                        $this->analysis['risk_of_bribery'] = "Regulatory violations present, ethical integrity is acceptable, but low loyalty raises concerns.";
                        $score = 60;
                    }
                    $this->analysis['risk_of_bribery'] = "Regulatory violations present, but ethical integrity and loyalty are acceptable.";
                    $score = 50;
                }
            } else { // No Criminal + No Regulatory Violations → Evaluate Job History
                if ($data['job_tenure'] < 30) {
                    if ($data['online_professional_reputation'] < 40) {
                        $this->analysis['risk_of_bribery'] = "Short job tenure combined with a poor online reputation suggests potential risk.";
                        $score = 55;
                    }
                    if ($data['professional_references'] < 40) {
                        $this->analysis['risk_of_bribery'] = "Short job tenure and weak professional references increase risk.";
                        $score = 50;
                    }
                    $this->analysis['risk_of_bribery'] = "Short job tenure, but online reputation and references are acceptable.";
                    $score = 45;
                } else { // Job Tenure is good → Evaluate Loyalty & Ethics
                    if ($data['loyalty'] < 50) {
                        if ($data['ethical_integrity'] < 60) {
                            $this->analysis['risk_of_bribery'] = "Low loyalty and moderate ethical integrity indicate some risk.";
                            $score = 40;
                        }
                        $this->analysis['risk_of_bribery'] = "Loyalty is low, but ethical integrity is acceptable.";
                        $score = 30;
                    } else { // Loyalty is Good → Evaluate Online Reputation
                        if ($data['online_professional_reputation'] < 50) {
                            $this->analysis['risk_of_bribery'] = "Good loyalty but weak online reputation slightly increases risk.";
                            $score = 25;
                        }
                        $this->analysis['risk_of_bribery'] = "Strong loyalty, good ethical integrity, and a solid professional reputation result in low risk.";
                        $score = 10;
                    }
                }
            }
        }
        return $score;
    }

    private function calculateEmployeeEfficiency($data) {
        if ($data['leadership_experience'] > 70) {
            if ($data['work_experience_level'] > 70) {
                if ($data['certifications_achieved'] > 50) {
                    if ($data['education_level'] > 60) {
                        $this->analysis['employee_efficiency'] = "Highly experienced, certified, and well-educated leader.";
                        return 100;
                    }
                    $this->analysis['employee_efficiency'] = "Highly experienced leader with strong certifications.";
                    return 90;
                } else {
                    $this->analysis['employee_efficiency'] = "Strong leader but certifications are lacking.";
                    return 80;
                }
            } else { // Work Experience Level is not very high
                if ($data['job_tenure'] > 60) {
                    $this->analysis['employee_efficiency'] = "Long-term employee with strong leadership but lower experience.";
                    return 75;
                }
                $this->analysis['employee_efficiency'] = "Leadership present but experience and tenure are lacking.";
                return 65;
            }
        } else { // Leadership Experience is below 70
            if ($data['work_experience_level'] > 50) {
                if ($data['certifications_achieved'] > 50) {
                    if ($data['career_progression'] > 60) {
                        $this->analysis['employee_efficiency'] = "Moderate experience with growth and certifications.";
                        return 70;
                    }
                    $this->analysis['employee_efficiency'] = "Moderate experience and certifications but low career growth.";
                    return 60;
                } else { // Low Certifications
                    if ($data['education_level'] > 50) {
                        $this->analysis['employee_efficiency'] = "Educated but lacks leadership and certifications.";
                        return 55;
                    }
                    $this->analysis['employee_efficiency'] = "Neither leadership nor strong credentials.";
                    return 45;
                }
            } else { // Work Experience Level is low
                if ($data['job_tenure'] < 40) {
                    $this->analysis['employee_efficiency'] = "Low experience, low tenure → Inefficient employee.";
                    return 30;
                }
                if ($data['career_progression'] < 40) {
                    $this->analysis['employee_efficiency'] = "No experience, no career growth → Very inefficient.";
                    return 25;
                }
                $this->analysis['employee_efficiency'] = "Overall weak employee efficiency.";
                return 20;
            }
        }
    }

    private function calculateRiskOfEmployeeTurnover($data)
    {
        if ($data['job_tenure'] < 30) {
            if ($data['employment_gaps'] > 50) {
                if ($data['loyalty'] < 40) {
                    $this->analysis['risk_of_employee_turnover'] = "High turnover risk: Short job tenure, frequent employment gaps, and low loyalty.";
                    return 90;
                }
                $this->analysis['risk_of_employee_turnover'] = "Moderate to high turnover risk: Short job tenure and frequent employment gaps.";
                return 80;
            } else { // Employment Gaps are not high
                if ($data['career_stability'] < 40) {
                    $this->analysis['risk_of_employee_turnover'] = "High turnover risk due to short job tenure and unstable career history.";
                    return 75;
                }
                if ($data['salary_history'] < 50) {
                    $this->analysis['risk_of_employee_turnover'] = "Job tenure is short, but career stability is moderate. Salary inconsistency adds risk.";
                    return 70;
                }
                $this->analysis['risk_of_employee_turnover'] = "Short job tenure is a concern, but career stability and salary history are reasonable.";
                return 65;
            }
        } else { // Job tenure is 30 or more
            if ($data['loyalty'] < 40) {
                if ($data['career_stability'] < 50) {
                    $this->analysis['risk_of_employee_turnover'] = "Moderate turnover risk: Long job tenure, but low loyalty and unstable career history.";
                    return 60;
                }
                if ($data['employment_gaps'] > 50) {
                    $this->analysis['risk_of_employee_turnover'] = "Moderate turnover risk: Long tenure, but frequent employment gaps.";
                    return 55;
                }
                $this->analysis['risk_of_employee_turnover'] = "Low to moderate risk: Employee has long tenure but exhibits low loyalty.";
                return 50;
            } else { // Loyalty is 40 or higher
                if ($data['career_stability'] < 50) {
                    $this->analysis['risk_of_employee_turnover'] = "Low turnover risk: Good loyalty, but career history suggests some instability.";
                    return 40;
                }
                if ($data['employment_gaps'] > 50) {
                    $this->analysis['risk_of_employee_turnover'] = "Low turnover risk: Good loyalty and stable career, but some employment gaps.";
                    return 35;
                }
                if ($data['salary_history'] > 60) {
                    $this->analysis['risk_of_employee_turnover'] = "Very low turnover risk: Employee has long tenure, strong loyalty, and good salary history.";
                    return 20;
                }
                $this->analysis['risk_of_employee_turnover'] = "Very low turnover risk: Employee has long tenure and exhibits high loyalty.";
                return 15;
            }
        }
    }

    private function calculateEmployeeReputation($data) {
        if ($data['ethical_integrity'] < 40) {
            if ($data['criminal_record']) {
                if ($data['online_professional_reputation'] < 40) {
                    $this->analysis['employee_reputation'] = "Very low reputation: Poor ethical integrity, criminal record, and bad online reputation.";
                    return 10;
                }
                $this->analysis['employee_reputation'] = "Very low reputation: Poor ethical integrity combined with a criminal record.";
                return 15;
            } else { // No criminal record but low ethical integrity
                if ($data['professional_references'] < 40) {
                    $this->analysis['employee_reputation'] = "Low reputation: Poor ethical integrity and weak professional references.";
                    return 25;
                }
                if ($data['online_professional_reputation'] < 50) {
                    $this->analysis['employee_reputation'] = "Low reputation: Ethical concerns and poor online reputation.";
                    return 30;
                }
                $this->analysis['employee_reputation'] = "Moderate reputation: Poor ethical integrity but positive references and online reputation.";
                return 35;
            }
        } else { // Ethical Integrity is 40 or higher
            if ($data['criminal_record']) {
                if ($data['online_professional_reputation'] < 40) {
                    $this->analysis['employee_reputation'] = "Moderate risk: Good ethical integrity but a criminal record and bad online reputation.";
                    return 40;
                }
                if ($data['professional_references'] > 60) {
                    $this->analysis['employee_reputation'] = "Moderate reputation: Ethical integrity is strong, but the criminal record raises concerns.";
                    return 45;
                }
                $this->analysis['employee_reputation'] = "Moderate reputation: Ethical integrity is acceptable, but the criminal record affects trustworthiness.";
                return 50;
            } else { // No Criminal Record
                if ($data['online_professional_reputation'] < 50) {
                    if ($data['linkedin_recommendations'] < 40) {
                        $this->analysis['employee_reputation'] = "Moderate reputation: No criminal record, but weak online presence and LinkedIn recommendations.";
                        return 55;
                    }
                    $this->analysis['employee_reputation'] = "Good reputation: Ethical integrity is strong, but online reputation could improve.";
                    return 65;
                } else { // Strong Online Reputation
                    if ($data['professional_references'] > 70) {
                        if ($data['linkedin_recommendations'] > 60) {
                            $this->analysis['employee_reputation'] = "Excellent reputation: Strong ethical integrity, solid references, and a great online presence.";
                            return 95;
                        }
                        $this->analysis['employee_reputation'] = "Very good reputation: Ethical and professional references are strong.";
                        return 85;
                    }
                    $this->analysis['employee_reputation'] = "Strong reputation: Good ethical integrity and online reputation but needs more professional references.";
                    return 75;
                }
            }
        }
    }

    private function calculateCareerGrowthPotential($data) {
        if ($data['certifications_achieved'] > 70) {
            if ($data['education_level'] > 70) {
                if ($data['work_experience_level'] > 70) {
                    if ($data['career_progression'] > 60) {
                        $this->analysis['career_growth_potential'] = "Very high career growth potential: Strong education, certifications, experience, and career progression.";
                        return 100;
                    }
                    $this->analysis['career_growth_potential'] = "High career growth potential: Excellent education, certifications, and work experience, but moderate career progression.";
                    return 90;
                }
                $this->analysis['career_growth_potential'] = "High career growth potential: Strong education and certifications, but work experience could improve.";
                return 85;
            } else {
                if ($data['career_progression'] > 60) {
                    $this->analysis['career_growth_potential'] = "Moderate to high career growth potential: Good certifications and career progression, but education level is not strong.";
                    return 80;
                }
                $this->analysis['career_growth_potential'] = "Moderate career growth potential: Strong certifications but education and career progression are lower.";
                return 75;
            }
        } else { // Certifications Achieved is 70 or lower
            if ($data['education_level'] > 50) {
                if ($data['work_experience_level'] > 50) {
                    if ($data['career_progression'] > 50) {
                        $this->analysis['career_growth_potential'] = "Moderate career growth potential: Balanced education, experience, and career progression.";
                        return 70;
                    }
                    $this->analysis['career_growth_potential'] = "Slightly below moderate career growth potential: Education and experience are good, but career progression is weak.";
                    return 65;
                }
                if ($data['leadership_experience'] > 60) {
                    $this->analysis['career_growth_potential'] = "Moderate potential: Leadership skills present, but lacking in work experience.";
                    return 60;
                }
                $this->analysis['career_growth_potential'] = "Below average career growth potential: Good education, but missing experience and leadership.";
                return 55;
            } else { // Education Level is 50 or lower
                if ($data['career_progression'] < 40) {
                    if ($data['work_experience_level'] < 40) {
                        $this->analysis['career_growth_potential'] = "Low career growth potential: Weak education, work experience, and career progression.";
                        return 30;
                    }
                    $this->analysis['career_growth_potential'] = "Low career growth potential: Career progression is weak, but experience helps slightly.";
                    return 40;
                }
                if ($data['leadership_experience'] < 40) {
                    $this->analysis['career_growth_potential'] = "Limited career growth potential: Education and leadership skills are lacking.";
                    return 35;
                }
                $this->analysis['career_growth_potential'] = "Very limited career growth potential: Education, experience, and career progression all need improvement.";
                return 25;
            }
        }
    }

    public function adjustMetrics($data, $metrics)
    {
        $client = OpenAI::client(env('OPENAI_API_KEY')); // Ensure your API key is set in the .env file

// Prepare the message with dynamic data
$messages = [
    [
        'role' => 'system',
        'content' => "You are an assistant that provides logical analysis in JSON format. You should give 5 numeric values only for the factors you are asked about!"
    ],
    [
        'role' => 'user',
        'content' => "You are an HR professional analyst. Here is data for this employee (1 to 100 where 50 is neutral, 100 is positive, and 0 is negative): 
        loyalty = {$data['loyalty']}; 
        ethical_integrity = {$data['ethical_integrity']}; 
        job_tenure = {$data['job_tenure']}; 
        professional_references = {$data['professional_references']}; 
        online_professional_reputation = {$data['online_professional_reputation']}; 
        criminal_record = {$data['criminal_record']}; 
        regulatory_violations = {$data['regulatory_violations']}; 
        work_experience_level = {$data['work_experience_level']}; 
        certifications_achieved = {$data['certifications_achieved']}; 
        education_level = {$data['education_level']}; 
        career_progression = {$data['career_progression']}; 
        leadership_experience = {$data['leadership_experience']}; 
        career_stability = {$data['career_stability']}; 
        salary_history = {$data['salary_history']}; 
        employment_gaps = {$data['employment_gaps']}; 
        linkedin_recommendations = {$data['linkedin_recommendations']}. 
        Based on these characteristics, my system calculated the following risk metrics: 
        risk_of_bribery = {$metrics['risk_of_bribery']}; 
        employee_efficiency = {$metrics['employee_efficiency']}; 
        risk_of_employee_turnover = {$metrics['risk_of_employee_turnover']}; 
        employee_reputation = {$metrics['employee_reputation']}; 
        career_growth_potential = {$metrics['career_growth_potential']}. 
        Please adjust these values realistically, ensuring changes are within 5% in the appropriate direction."
    ]
];

try {
    // Create the request to OpenAI API
    $response = $client->chat()->create([
        'model' => 'gpt-4',
        'messages' => $messages,
        'temperature' => 0.2,
        'max_tokens' => 150,
    ]);

    // Check if the response contains the 'choices' key
    if (isset($response['choices'][0]['message']['content'])) {
        $adjustedValues = $response['choices'][0]['message']['content'];
        $adjustedMetrics = json_decode($adjustedValues, true);
    } else {
        Log::error('OpenAI API response did not contain expected data.');
        $adjustedMetrics = [];
    }
} catch (\Exception $e) {
    Log::error('OpenAI API request failed: ' . $e->getMessage());
    $adjustedMetrics = [];
}

// Return adjusted metrics


// Return adjusted metrics
return $adjustedMetrics;
    
  }
}