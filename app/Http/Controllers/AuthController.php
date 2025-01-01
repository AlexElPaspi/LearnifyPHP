<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function getNickname()
    {
        $user = Auth::user();
        return response()->json([
            'nickname' => $user ? $user->nickname : null,
        ]);
    }

    public function checkAuth()
    {
        return response()->json([
            'authenticated' => Auth::check(),
        ]);
    }
}
