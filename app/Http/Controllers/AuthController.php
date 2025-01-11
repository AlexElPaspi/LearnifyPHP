<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function getUser()
    {
        $user = Auth::user();
        return response()->json([
            'first_name' => $user ? $user->first_name : null,
            'last_name' => $user ? $user->last_name : null,
            'birth_date' => $user ? $user->birth_date : null,
            'nickname' => $user ? $user->nickname : null,
            'photo' => $user ? $user->photo : null,
            'email' => $user ? $user->email : null,
            'bio' => $user ? $user->bio : null, // Asegúrate de incluir la biografía
        ]);
    }


    public function checkAuth()
    {
        return response()->json([
            'authenticated' => Auth::check(),
        ]);
    }
}
