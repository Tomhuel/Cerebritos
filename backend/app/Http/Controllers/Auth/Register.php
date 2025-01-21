<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Register extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => "required|string|max:255",
            'email' => "required|email|max:255",
            'password' => "required|string",
            'age' => "numeric",
            'role_id' => "required|numeric"
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json(["message" => "User already exists"], 409);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
                'age' => $request->age,
                'uuid' => Str::uuid()
            ]);
        }

        $token = $user->createToken("auth")->accessToken;

        return response()->json(["token" => $token], 200);
    }
}
