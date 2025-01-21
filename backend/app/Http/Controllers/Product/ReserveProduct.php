<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReserveProduct extends Controller
{
    public function reserveProduct(Request $request, $id) {
        $user = Auth::user();
        $user_points = $user->points;

        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        if ($product->points_price > $user_points) {
            return response()->json(['message' => 'Not enough points'], 403);
        }

        $user->points -= $product->points_price;
        $user->save();

        Order::create([
            'user_id' => $user->id,
            'product_id' => $product->id
        ]);

        return response()->json(['message' => 'Product reserved succesfully'], 200);
    }
}
