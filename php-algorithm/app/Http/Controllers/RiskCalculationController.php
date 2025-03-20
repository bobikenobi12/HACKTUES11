<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RiskCalculationController extends Controller
{
     /**
     * Calculate various employee metrics based on their characteristics.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function calculateMetrics(Request $request) {
        $loyalty = $request->input('loyalty', 50);
        $ethicalIntegrity = $request->input('ethical_integrity', 50);
        $jobTenure = $request->input('job_tenure', 50);
        $professionalReferences = $request->input('professional_references', 50);
        $onlineProfessionalReputation = $request->input('online_professional_reputation', 50);
        $criminalRecord = $request->input('criminal_record', false);
        $regulatoryViolations = $request->input('regulatory_violations', 0);
        $workExperienceLevel = $request->input('work_experience_level', 50);
        $certificationsAchieved = $request->input('certifications_achieved', 50);
        $educationLevel = $request->input('education_level', 50);
        $careerProgression = $request->input('career_progression', 50);
        $leadershipExperience = $request->input('leadership_experience', 50);
        $careerStability = $request->input('career_stability', 50);
        $salaryHistory = $request->input('salary_history', 50);
        $employmentGaps = $request->input('employment_gaps', 0);
        $linkedinRecommendations = $request->input('linkedin_recommendations', 50);
        $negativeFeedback = $request->input('negative_feedback', false);
    
        $riskOfBribery = $this->calculateRiskOfBribery($loyalty, $ethicalIntegrity, $jobTenure, $professionalReferences, $onlineProfessionalReputation, $criminalRecord, $regulatoryViolations);
        $employeeEfficiency = $this->calculateEmployeeEfficiency($workExperienceLevel, $certificationsAchieved, $educationLevel, $jobTenure, $careerProgression, $leadershipExperience);
        $riskOfEmployeeTurnover = $this->calculateRiskOfEmployeeTurnover($jobTenure, $loyalty, $careerStability, $salaryHistory, $employmentGaps);
        $employeeReputation = $this->calculateEmployeeReputation($ethicalIntegrity, $professionalReferences, $onlineProfessionalReputation, $linkedinRecommendations, $criminalRecord, $negativeFeedback);
        $careerGrowthPotential = $this->calculateCareerGrowthPotential($certificationsAchieved, $educationLevel, $workExperienceLevel, $careerProgression, $leadershipExperience);
    
        return response()->json([
            'risk_of_bribery' => $riskOfBribery,
            'employee_efficiency' => $employeeEfficiency,
            'risk_of_employee_turnover' => $riskOfEmployeeTurnover,
            'employee_reputation' => $employeeReputation,
            'career_growth_potential' => $careerGrowthPotential
        ]);
    }
    
    function calculateRiskOfBribery($loyalty, $ethicalIntegrity, $jobTenure, $professionalReferences, $onlineProfessionalReputation, $criminalRecord, $regulatoryViolations) {
        $criminalPenalty = ($criminalRecord ? 1 : 0) * 100;
        $regulationPenalty = $regulatoryViolations * 75;
        $loyaltyEthicalMultiplier = (0.5 * $loyalty * $ethicalIntegrity) / 100;
        $jobTenureReferencesMultiplier = (0.5 * $jobTenure * $professionalReferences) / 100;
        $onlineReputationMultiplier = 0.5 * $onlineProfessionalReputation;
        $briberyRisk = $loyaltyEthicalMultiplier + $jobTenureReferencesMultiplier + $onlineReputationMultiplier - $criminalPenalty - $regulationPenalty;
        return max(0, min(100, $briberyRisk));
    }
    
    function calculateEmployeeEfficiency($workExperienceLevel, $certificationsAchieved, $educationLevel, $jobTenure, $careerProgression, $leadershipExperience) {
        $experienceCertificationsMultiplier = (0.7 * $workExperienceLevel * $certificationsAchieved) / 100;
        $educationTenureMultiplier = (0.3 * $educationLevel * $jobTenure) / 100;
        $efficiency = $experienceCertificationsMultiplier + $educationTenureMultiplier + $careerProgression + (0.4 * $leadershipExperience);
        return max(0, min(1000, $efficiency));
    }
    
    function calculateRiskOfEmployeeTurnover($jobTenure, $loyalty, $careerStability, $salaryHistory, $employmentGaps) {
        $turnoverRisk = (0.5 * $jobTenure * $loyalty) / 100 + (0.5 * $careerStability * $salaryHistory) / 100 - (0.75 * $employmentGaps);
        return max(0, min(100, $turnoverRisk));
    }
    
    function calculateEmployeeReputation($ethicalIntegrity, $professionalReferences, $onlineProfessionalReputation, $linkedinRecommendations, $criminalRecord, $negativeFeedback) {
        $reputationPenalty = ($criminalRecord ? 1 : 0) * 25 + ($negativeFeedback ? 1 : 0) * 50;
        $ethicsReferencesMultiplier = (0.6 * $ethicalIntegrity * $professionalReferences) / 100;
        $onlineReputationMultiplier = (0.4 * $onlineProfessionalReputation * $linkedinRecommendations) / 100;
        $reputation = $ethicsReferencesMultiplier + $onlineReputationMultiplier - $reputationPenalty;
        return max(0, min(100, $reputation));
    }
    
    function calculateCareerGrowthPotential($certificationsAchieved, $educationLevel, $workExperienceLevel, $careerProgression, $leadershipExperience) {
        $certificationsEducationMultiplier = (0.6 * $certificationsAchieved * $educationLevel) / 100;
        $workExperienceProgressionMultiplier = (0.4 * $workExperienceLevel * $careerProgression) / 100;
        $leadershipGrowth = (0.5 * $leadershipExperience * 20);
        $growthPotential = $certificationsEducationMultiplier + $workExperienceProgressionMultiplier + $leadershipGrowth;
        return max(0, min(100, $growthPotential));
    }
    
}