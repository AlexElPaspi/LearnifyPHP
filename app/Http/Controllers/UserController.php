<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function update(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'email' => 'required|email',
            'password' => 'nullable|string|min:8|confirmed',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = Auth::user();
        $user->email = $request->input('email');
        $user->bio = $request->input('bio');

        // Manejar la subida de la foto de perfil
        if ($request->hasFile('photo')) {
            // Eliminar la foto anterior si existe
            if ($user->photo) {
                Storage::disk('public')->delete('images/' . $user->photo);
            }

            // Almacenar la nueva imagen en 'public/images' y obtener el nombre del archivo almacenado
            $path = $request->file('photo')->store('images', 'public');
            $user->photo = basename($path);
        }

        // Manejar la actualización de la contraseña
        if ($request->input('password')) {
            $user->password = Hash::make($request->input('password'));
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
        ]);
    }
}
