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
        // Validar los datos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $credentials = $request->only('email', 'password');
    
        if (Auth::attempt($credentials)) {
            // Autenticación exitosa
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
    
            // Guardar el token en sesión para usarlo en el frontend
            $request->session()->put('api_token', $token);
    
            // Devolver una respuesta JSON para manejar el éxito en frontend
            return response()->json(['message' => 'Inicio de sesión exitoso', 'redirect' => 'home'], 200);
        }
    
        // Autenticación fallida - devolver una respuesta JSON
        return response()->json(['message' => 'Las credenciales no coinciden con nuestros registros.'], 401);
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
