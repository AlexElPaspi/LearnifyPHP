<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function create()
    {
        return view('auth.create-course');
    }

    public function store(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Crear el nuevo curso
        $course = new Course();
        $course->id_user = Auth::id();
        $course->title = $request->input('title');
        $course->description = $request->input('description');

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('courses/logos', 'public');
            $course->logo = basename($path);
        }

        $course->save();

        return redirect()->route('home')->with('success', 'El curso se ha creado exitosamente.');
    }

    public function createdCourses()
    {
        return view('auth.created-courses');
    }

    public function getCreatedCourses()
    {
        $userId = Auth::id();
        $courses = Course::where('id_user', $userId)->get();
        return response()->json($courses);
    }
}
