<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Logout extends Controller
{
    public static function logout(Request $request) {
        $token = Auth::user()->token();

        $token->revoke();

        return response()->json(["message" => "User logged out succesfully"], 200);
    }
}
