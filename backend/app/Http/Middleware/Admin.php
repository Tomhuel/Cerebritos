<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowedUser = Auth::user();

        if ($allowedUser->role->id !== config('roles.roles.admin')) {
            return response()->json([
                "message" => "You don't have permission to do that."
            ], 401);
        }

        return $next($request);
    }
}
