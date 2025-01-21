<?php

namespace App\Http\Controllers\Club;

use App\Http\Controllers\Controller;
use App\Models\Club;
use Illuminate\Http\Request;

class GetClubController extends Controller
{
    public function getClub(Request $request, $clubId)
    {
        $club = Club::find($clubId);

        if (!$club) {
            return response()->json(["message" => "Club not found"], 404);
        }

        return response()->json(['data' => $club], 200);
    }

    public function getAllClubs(Request $request)
    {
        $clubs = Club::all();

        return response()->json(["data" => $clubs], 200);
    }
}
