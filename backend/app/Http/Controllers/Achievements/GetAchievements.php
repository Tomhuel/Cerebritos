<?php

namespace App\Http\Controllers\Achievements;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;

class GetAchievements extends Controller
{
    public function GetAchievement(Request $request, $id)
    {
        $achievment = Achievement::find($id);

        if (!$achievment) {
            return response()->json(['message' => 'Achievement not found'], 404);
        }

        $achievment->image = asset('storage/' . $achievment->image);

        return response()->json(['data' => $achievment], 200);
    }

    public function GetAchievements(Request $request)
    {
        $page = $request->query('page') ?? 1;
        $perPage = 12;
        $offset = ($page - 1) * $perPage;
        $achievements = Achievement::orderBy('updated_at', 'desc')->offset($offset)->limit($perPage)->get();

        $response = $achievements->map(function ($achiev) {
            $achiev->image = asset('storage/' . $achiev->image);
            return $achiev;
        });

        return response()->json(["data" => $response], 200);
    }
}
