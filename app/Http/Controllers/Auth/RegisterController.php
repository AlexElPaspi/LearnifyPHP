<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;

class RegisterController extends Controller
{
    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    protected function register(Request $request)
    {
        try {
            Log::info('Iniciando registro de usuario:', $request->all());
            $this->validator($request->all())->validate();

            $user = $this->create($request->all());
            Log::info('Usuario creado:', ['user_id' => $user->id]);

            // Autenticar al usuario una vez registrado
            auth()->login($user);
            Log::info('Usuario autenticado:', ['user_id' => $user->id]);

            // Crear un token para el usuario registrado
            $token = $user->createToken('auth_token')->plainTextToken;
            $request->session()->put('api_token', $token);

            return redirect()->route('home');
        } catch (\Exception $e) {
            Log::error('Error registrando el usuario:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Error registrando el usuario. Por favor, inténtelo de nuevo.');
        }
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
    }

    protected function create(array $data)
    {
        // Obtener el primer nombre y la primera letra del primer apellido
        $firstName = explode(' ', $data['first_name'])[0];
        $firstLastNameLetter = substr(explode(' ', $data['last_name'])[0], 0, 1);

        // Generar el nickname
        $nickname = "{$firstName} {$firstLastNameLetter}.";

        return User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'birth_date' => $data['birth_date'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'user', // Asigna el rol "user" automáticamente
            'nickname' => $nickname, // Asigna el nickname generado automáticamente
            'photo' => 'profile-photo.png', // Asigna esta foto de perfil por defecto
        ]);
    }
}
