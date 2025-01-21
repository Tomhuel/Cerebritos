<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

class GoogleAuth extends Controller
{
    public static function callback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::where('email', $googleUser->email)->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->user["given_name"],
                    'google_id' => $googleUser->id,
                    'role_id' => 4,
                    'email' => $googleUser->email,
                    'uuid' => Str::uuid()
                ]);
            } else if (!$user->google_id) {
                $user->google_id = $googleUser->id;
                $user->save();
            }

            $token = $user->createToken("auth")->accessToken;
            return Redirect::to(env('APP_FRONTEND_URL') . '?token=' . $token);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error proccesing Google User'], 500);
        }
    }

    public static function redirect(Request $request)
    {
        return Socialite::driver('google')->redirect();
    }
}
