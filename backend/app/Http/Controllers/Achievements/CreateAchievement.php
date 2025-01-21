<?php

namespace App\Http\Controllers\Achievements;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Achievement;
use Exception;
use Illuminate\Support\Facades\Storage;

class CreateAchievement extends Controller
{
    public function CreateAchievement(Request $request)
    {
        $flag = false;
        try {
            $this->validate($request, [
                'name' => "required|string|max:255",
                'description' => 'required|string|max:255',
                'image' => 'required|image|mimes:jpeg,png,gif,svg|max:2048',
                'points' => "required|numeric"
            ]);

            $image = $request->file('image');
            $path = $image->store('images/achievements', 'public');
            $flag = true;

            Achievement::create([
                'name' => $request->name,
                'description' => $request->description,
                'image' => $path,
                'points' => $request->points
            ]);

            return response()->json(["message" => "Achievement created succesfully"], 200);
        } catch (Exception $e) {
            if ($flag) {
                Storage::delete('public/' . $path);
            }
            return response()->json(["message" => "Error creating achievement"], 500);
        }
    }
}
