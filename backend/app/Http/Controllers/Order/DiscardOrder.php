<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class DiscardOrder extends Controller
{
    public function discardOrder(Request $request, $id) {

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->recieved = true;

        $order->save();

        return response()->json(['message' => 'Order discarded succesfully'], 200);
    }
}
