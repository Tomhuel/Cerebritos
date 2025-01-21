<?php

namespace App\Http\Controllers\Logs;

use App\Http\Controllers\Controller;
use App\Models\Log;
use Illuminate\Http\Request;

class GetLogs extends Controller
{
    public function getLogs(Request $request) {
        $page = $request->query('page') ?? 1;
        $perPage = 30;
        $offset = ($page - 1) * $perPage;
        $logs = Log::orderBy('updated_at', 'desc')->offset($offset)->limit($perPage)->get();
        return response()->json(['data' => $logs], 200);
    }
}
