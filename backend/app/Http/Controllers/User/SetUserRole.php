<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class SetUserRole extends Controller
{
    public function setUserRole(Request $request)
    {
        $adminUser = Auth::user();
        $adminUserRole = $adminUser->role->name;

        $this->validate($request, [
            'user_id' => "numeric|required",
            'role_id' => 'numeric|required'
        ]);

        $newRoleId = $request->role_id;

        $valid = false;

        foreach (Role::all() as $role) {
            if ($role->id == $newRoleId) {
                $valid = true;
            }
        }

        if (!$valid) {
            return response()->json([
                "message" => "Role Id doesn't exists"
            ], 404);
        }

        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(["message" => "The User doesn't exists"], 404);
        }

        $previousRole = $user->role->name;
        $user->role_id = $newRoleId;
        $user->save();

        $userRoleName = Role::find($newRoleId)->name;

        Log::create([
            'message' => "El $adminUserRole $adminUser->name ha cambiado el rol del usuario: $user->name de $previousRole a $userRoleName",
            'logType' => config('logTypes.logTypes.rol_change')
        ]);
        return response()->json(["message" => "Role succesfully changed"], 200);
    }
}
