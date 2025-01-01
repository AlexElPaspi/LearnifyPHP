<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            if (!Auth::check()) {
                return response()->json(['authenticated' => false], 200);
            }
            return $next($request);
        }
        return redirect()->route('login');
    }
}
