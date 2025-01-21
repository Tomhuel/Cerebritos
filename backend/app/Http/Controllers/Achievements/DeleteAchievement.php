<?php

namespace App\Http\Controllers\Achievements;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Achievement;
use Illuminate\Support\Facades\Storage;
use Exception;

class DeleteAchievement extends Controller
{
    public function DeleteAchievement(Request $request, $id)
    {
        try {
            $achievement = Achievement::find($id);

            if (!$achievement) {
                return response()->json(['message' => 'Achievement not found'], 404);
            }

            if (Storage::delete('public/' . $achievement->image)) {
                $achievement->delete();
            } else {
                throw new Exception('No Image');
            }

            return response()->json(["message" => "Achievement Deleted Succesfully"], 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Server Error"], 500);
        }
    }
}
