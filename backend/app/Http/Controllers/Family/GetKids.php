<?php

namespace App\Http\Controllers\Family;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetKids extends Controller
{
    public function getKids(Request $request)
    {
        $user = Auth::user();
        $kids = $user->kids()->get();
        return response()->json(['data' => $kids], 200);
    }
}
