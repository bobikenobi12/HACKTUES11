<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RiskCalculationController extends Controller
{
    public function testApi(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'API is working correctly!',
        ]);
    }

    /**
     * A real API for calculating risk (just a placeholder for now).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function calculateRisk(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Risk calculation is not implemented yet!',
        ]);
    }
}
