<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function showAllCourses()
    {
        return view('courses.index');
    }

    public function getAllCourses()
    {
        $courses = Course::with('user')->get();
        return response()->json($courses);
    }

    public function showCourse($id)
    {
        $course = Course::with('user')->findOrFail($id);
        return response()->json($course);
    }

    public function create()
    {
        return view('courses.create-course');
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
        return view('courses.created-courses');
    }

    public function getCreatedCourses()
    {
        $userId = Auth::id();
        $courses = Course::where('id_user', $userId)->get();
        return response()->json($courses);
    }

    public function getCourse($id)
    {
        $course = Course::with('user')->findOrFail($id);
        return response()->json($course);
    }
    

    public function edit($id)
    {
        $course = Course::where('id_course', $id)->where('id_user', Auth::id())->firstOrFail();
        return view('courses.edit-course', compact('course'));
    }

    public function update(Request $request, $id)
    {
        $course = Course::where('id_course', $id)->where('id_user', Auth::id())->firstOrFail();

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $course->title = $request->input('title');
        $course->description = $request->input('description');

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('courses/logos', 'public');
            $course->logo = basename($path);
        }

        $course->save();

        return redirect()->route('created-courses')->with('success', 'El curso se ha actualizado satisfactoriamente.');
    }
}
