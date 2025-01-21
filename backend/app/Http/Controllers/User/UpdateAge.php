<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpdateAge extends Controller
{
    // ! Deprecated
    public function updateAge(Request $request) {
        $user = Auth::user();

        $newAge = $request->age;

        if ($newAge < 0 || !is_int($newAge)) {
            return response()->json([
                "message" => "Age have to be an int and above 0"
            ], 400);
        }

        $user->age = $newAge;
        $user->save();

        return response()->json([
            "message" => "User's age updated succesfully"
        ], 200);
    }
}
