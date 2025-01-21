<?php

namespace App\Http\Controllers\Achievements;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MyAchievements extends Controller
{
    public function myAchievements(Request $request)
    {
        $page = $request->query('page') ?? 1;
        $perPage = 12;
        $offset = ($page - 1) * $perPage;
        $user = Auth::user();
        $achievements = $user->achievements()->skip($offset)->take($perPage)->get();

        $response = $achievements->map(function ($achiev) {
            $achiev->image = asset('storage/' . $achiev->image);
            return $achiev;
        });

        return response()->json(['data' => $response], 200);
    }
}
