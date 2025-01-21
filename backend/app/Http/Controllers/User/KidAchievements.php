<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class KidAchievements extends Controller
{
    public function kidAchievements(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => "The user doesn't exists"], 404);
        }
        $achievements = $user->achievements()->get();
        $response = $achievements->map(function ($achiev) {
            $achiev->image = asset('storage/'.$achiev->image);
            return $achiev;
        });
        return response()->json(["data" => $response], 200);
    }
}
