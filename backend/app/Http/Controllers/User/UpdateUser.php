<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Storage;

class UpdateUser extends Controller
{
    public function updateUser(Request $request)
    {
        try {
            $user = Auth::user();

            $this->validate($request, [
                'username' => "sometimes|string|max:255",
                'image' => 'sometimes|image|mimes:jpeg,png,gif,svg|max:2048',
                'age' => 'sometimes|numeric'
            ]);

            if ($request->hasFile('image')) {
                if ($user->image) {
                    Storage::delete('public/' . $user->image);
                }
                $image = $request->file('image');
                $path = $image->store('images', 'public');
                $user->image = $path;
            }

            $user->fill($request->only(['username', 'age']));
            $user->save();

            return response()->json(["message" => "User updated succesfully"], 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Error updating User"], 500);
        }
    }
}
