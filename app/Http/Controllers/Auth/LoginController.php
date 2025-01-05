<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Autenticación exitosa
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            // Guardar el token en sesión para usarlo en el frontend
            $request->session()->put('api_token', $token);

            return redirect()->intended('home');
        }

        // Autenticación fallida
        return redirect()->back()->withErrors([
            'email' => 'Las credenciales no coinciden con nuestros registros.',
        ]);
    }

    public function logout(Request $request) 
    { 
        // Revocar todos los tokens del usuario
        $user = Auth::user();
        if ($user) {
            $user->tokens()->delete();
        }

        Auth::logout(); 
        $request->session()->invalidate(); 
        $request->session()->regenerateToken(); 
        
        return redirect('/'); 
    }
}
