<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyJsonRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->header('Content-Type') != 'application/json') {
            return response('Content-Type must be application/json', 200);
        }

        if (!$request->isJson()) {
            return response('Request Body must be a JSON', 200)->json();
        }

        return $next($request);
    }
}
