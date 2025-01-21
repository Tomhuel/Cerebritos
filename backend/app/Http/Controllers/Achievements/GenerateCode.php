<?php

namespace App\Http\Controllers\Achievements;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\Code;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GenerateCode extends Controller
{
    public function GenerateCode(Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'achievementId' => "sometimes|numeric",
            'points' => "sometimes|numeric"
        ]);

        $achievementId = $request->achievementId;
        $points = $request->points;

        if (!$achievementId && !$points) {
            return response()->json(["Error" => "No achievement or Points given"], 400);
        }

        if (!$achievementId) {
            $code = Code::create([
                'code' => Str::uuid(),
                'redeemed' => false,
                'points' => $points,
                'achievement_id' => null,
            ]);
        } else {
            $achievement = Achievement::find($achievementId);

            if (!$achievement) {
                return response()->json(["Error" => "Achievement not found"], 404);
            }

            // Crea el código con achievement_id
            $code = Code::create([
                'code' => Str::uuid(),
                'redeemed' => false,
                'points' => $achievement->points,
                'achievement_id' => $achievement->id,
            ]);
        }
        Log::create([
            'message' => "Código '$code->code' creado por $user->name",
            'logType' => config('logTypes.logTypes.code_generation')
        ]);
        return response()->json([
            "code" => $code
        ], 200);
    }
}
