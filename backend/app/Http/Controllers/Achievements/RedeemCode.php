<?php

namespace App\Http\Controllers\Achievements;

use App\Http\Controllers\Controller;
use App\Models\Code;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedeemCode extends Controller
{
    public function redeemCode(Request $request)
    {
        try {
            $user = Auth::user();

            $code = Code::where('code', $request->code)->first();
            if ($code->redeemed) {
                return response()->json(['message' => 'This code has been already redeemed'], 401);
            }

            $code->redeemed = true;
            $user->points += $code->points;
            if ($code->achievement_id != null) {
                $user->achievements()->attach($code->achievement_id);
            }
            $code->save();
            $user->save();
            return response()->json(['message' => 'Code redeemed succesfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error redeeming your code'], 500);
        }
    }
}
