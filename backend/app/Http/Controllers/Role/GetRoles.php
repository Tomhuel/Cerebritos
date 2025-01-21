<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class GetRoles extends Controller
{
    public function getRoles() {
        $roles = Role::all();
        return response()->json(['data' => $roles], 200);
    }
}
