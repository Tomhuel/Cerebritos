<?php

namespace App\Http\Controllers\Family;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddKid extends Controller
{
    public function addKid(Request $request)
    {
        $user = Auth::user();
        if ($user->role->id != config('roles.roles.padre')) {
            return response()->json(['message' => 'The user must be a father'], 400);
        }
        if (!$request->has('kidUUID')) {
            return response()->json(['message' => 'kidUUID must be provided'], 400);
        }
        $kidUUID = $request->kidUUID;
        $kidUser = User::where('uuid', $kidUUID)->first();
        if ($kidUser->role_id != config('roles.roles.niño')) {
            return response()->json(['message' => 'The UUID must be from a Kid'], 400);
        }
        $user->kids()->attach($kidUser->id);
        return response()->json(['message' => 'Kid added succesfully!'], 200);
    }
}
