<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CreateProduct extends Controller
{
    public function createProduct(Request $request)
    {
        $flag = false;
        try {
            $this->validate($request, [
                'name' => "required|string|max:255",
                'description' => "required|string|max:255",
                'price' => "required|numeric",
                'points_price' => "required|numeric",
                'image' => "required|image|mimes:jpeg,png,gif,svg|max:2048",
            ]);

            $image = $request->file('image');
            $path = $image->store('images/products', 'public');
            $flag = true;

            $points_price = (int) $request->points_price;

            Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'points_price' => $points_price,
                'price' => $request->price,
                'image' => $path,
            ]);
            return response()->json(["message" => "Product created succesfully"], 200);
        } catch (Exception $e) {
            if ($flag) {
                Storage::delete('public/' . $path);
            }
            return response()->json(["message" => "Error creating product"], 500);
        }
    }
}
