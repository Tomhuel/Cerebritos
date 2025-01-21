<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\User;

class GetOrders extends Controller
{
    public function getOrders(Request $request)
    {
        $page = $request->query('page') ?? 1;
        $perPage = 30;
        $offset = ($page - 1) * $perPage;
        $orders = Order::orderBy('created_at', 'desc')->offset($offset)->limit($perPage)->get();
        $orders->map(function ($order) {
            $order->user = User::find($order->user_id);
            $order->product = Product::find($order->product_id);
        });

        return response()->json(['data' => $orders], 200);
    }
}
