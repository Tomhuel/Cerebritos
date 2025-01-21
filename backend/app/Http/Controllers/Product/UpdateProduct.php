<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class UpdateProduct extends Controller
{
    public function updateProduct(Request $request, $id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json(["message" => "Product not found"], 404);
            }

            $this->validate($request, [
                'name' => "sometimes|string|max:255",
                'description' => 'sometimes|string|max:255',
                'image' => 'sometimes|image|mimes:jpeg,png,gif,svg|max:2048',
                'points_price' => "sometimes|numeric",
                'price' => "sometimes|numeric"
            ]);

            if ($request->hasFile('image')) {
                Storage::delete('public/' . $product->image);
                $image = $request->file('image');
                $path = $image->store('images', 'public');
                $product->image = $path;
            }

            $product->fill($request->only(['name', 'description', 'points_price', 'price']));

            $product->save();

            return response()->json(["message" => "Product updated succesfully"], 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Error updating product"], 500);
        }
    }
}
