<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class GetProfiles extends Controller
{
    public function getProfiles(Request $request)
    {
        $page = $request->query('page') ?? 1;
        $perPage = 12;
        $offset = ($page - 1) * $perPage;
        $profiles = User::where('role_id', config('roles.roles.niño'))->offset($offset)->limit($perPage)->orderByDesc('id')->get();
        $profiles->map(function ($profile) {
            if ($profile->image) {
                $profile->image = asset('storage/' . $profile->image);
            }
            $profile->achievements = $profile->achievements()->count();
            return $profile;
        });
        return response()->json(["data" => $profiles], 200);
    }

    public function getProfile(Request $request, $id)
    {
        $profile = User::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        if ($profile->image !== null) {
            $profile->image = asset('storage/' . $profile->image);
        }

        $profileAchievements = $profile->achievements()->get();

        $achievements = $profileAchievements->map(function($achievement) {
            $achievement->image = asset('storage/' . $achievement->image);
            return $achievement;
        });

        $profile->achievements = $achievements;

        return response()->json(['data' => $profile], 200);
    }
}
