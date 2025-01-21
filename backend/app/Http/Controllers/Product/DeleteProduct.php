<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DeleteProduct extends Controller
{
    public function deleteProduct(Request $request, $id) {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            if (Storage::delete('public/' . $product->image)) {
                $product->delete();
            } else {
                throw new Exception('No Image');
            }

            return response()->json(["message" => "Product Deleted Succesfully"], 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Server Error"], 500);
        }
    }
}
