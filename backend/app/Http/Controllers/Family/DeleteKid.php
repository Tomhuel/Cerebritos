<?php

namespace App\Http\Controllers\Family;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DeleteKid extends Controller
{
    public function deleteKid(Request $request, $id)
    {
        $user = Auth::user();
        $kidUser = User::find($id);
        if (!$kidUser) {
            return response()->json(['message' => 'Kid does not exist!'], 400);
        }
        $user->kids()->detach($kidUser->id);
        return response()->json(['message' => 'Kid removed succesfully!'], 200);
    }
}
