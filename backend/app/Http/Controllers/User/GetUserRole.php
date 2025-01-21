<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetUserRole extends Controller
{
    public static function getUserRole(Request $request) {
        $user = Auth::user();

        $response = response()->json([
            "role_id" => $user->role->id,
            "role_name" => $user->role->name
        ], 200);

        return $response;
    }
}
