<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeleteAccount extends Controller
{
    public function deleteAccount(Request $request)
    {
        $user = Auth::user();

        $token = Auth::user()->token();

        $token->revoke();

        $user->delete();

        return response()->json(["message" => "User deleted succesfully"], 200);
    }
}
