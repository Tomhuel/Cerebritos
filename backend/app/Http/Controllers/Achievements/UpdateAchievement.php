<?php

namespace App\Http\Controllers\Achievements;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Storage;

class UpdateAchievement extends Controller
{
    public function UpdateAchievement(Request $request, $id)
    {
        try {
            $achievement = Achievement::find($id);

            if (!$achievement) {
                return response()->json(['message' => 'Achievement not found'], 404);
            }

            $this->validate($request, [
                'name' => "sometimes|string|max:255",
                'description' => 'sometimes|string|max:255',
                'image' => 'sometimes|image|mimes:jpeg,png,gif,svg|max:2048',
                'points' => "sometimes|numeric"
            ]);

            if ($request->hasFile('image')) {
                Storage::delete('public/' . $achievement->image);
                $image = $request->file('image');
                $path = $image->store('images', 'public');
                $achievement->image = $path;
            }

            $achievement->fill($request->only(['name', 'description', 'points']));

            $achievement->save();

            return response()->json(["message" => "Achievement updated succesfully"], 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Error updating achievement"], 500);
        }
    }
}
