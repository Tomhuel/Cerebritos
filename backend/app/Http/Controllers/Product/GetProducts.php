<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class GetProducts extends Controller
{
    public function getProducts(Request $request)
    {
        $page = $request->query('page') ?? 1;
        $filter = $request->query('filter') ?? 'updated_at';
        $filters = ['points_price', 'price', 'name', 'updated_at'];
        if (!in_array($filter, $filters)) {
            return response()->json(['message' => 'Filter query invalid'], 400);
        }
        $order = $request->query('order') ?? 'desc';
        if ($order != 'desc' && $order != 'asc') {
            return response()->json(['message' => 'Order By query invalid'], 400);
        }
        $perPage = 12;
        $offset = ($page - 1) * $perPage;
        $products = Product::orderBy($filter, $order)->offset($offset)->limit($perPage)->get();
        $response = $products->map(function ($product) {
            $product->image = asset('storage/' . $product->image);
            return $product;
        });
        return response()->json(["data" => $response], 200);
    }

    public function getProduct(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->image = asset('storage/' . $product->image);

        return response()->json(['data' => $product], 200);
    }
}
