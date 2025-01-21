<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetUser extends Controller
{
    public function getUser(Request $request)
    {
        $user = Auth::user();
        $user->role = $user->role;
        if ($user->image !== null) {
            $user->image = asset('storage/' . $user->image);
        }
        return response()->json(['data' => $user], 200);
    }

    public function getUsers(Request $request)
    {
        $page = $request->query('page') ?? 1;
        $emailQuery = $request->query('email') ?? '';
        $perPage = 12;
        $offset = ($page - 1) * $perPage;
        $users = User::where('email', 'like', "%$emailQuery%")->offset($offset)->limit($perPage)->orderByDesc('id')->get();
        $newUsers = $users->map(function ($user) {
            if ($user->image) {
                $user->image = asset('storage/' . $user->image);
            }
            return $user;
        });
        return response()->json(['data' => $newUsers], 200);
    }
}
