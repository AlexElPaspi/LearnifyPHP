<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseContent;
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
        return view('courses.course-detail');
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
        $userId = Auth::id(); $courses = Course::where('id_user', $userId)->get(); return response()->json($courses); 
    } 
    
    public function getCourse($id) 
    {
        $course = Course::with('user', 'contents')->findOrFail($id); return response()->json($course); 
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
        $course->save(); return redirect()->route('created-courses')->with('success', 'El curso se ha actualizado satisfactoriamente.'); 
    } 
    
    public function subscribe($id)
    { 
        $user = Auth::user(); // Verificar si se obtuvo correctamente el usuario autenticado 
        if (!$user) { 
            return response()->json(['message' => 'Usuario no autenticado.'], 401); 
        } // Verificar si el usuario ya está inscrito en el curso 
        $alreadySubscribed = $user->courses()->where('course_student.id_course', $id)->exists(); 
        if ($alreadySubscribed) {
            return response()->json(['message' => 'Ya estás inscrito en este curso.'], 400); 
        } // Inscribir al usuario en el curso 
        try { $user->courses()->attach($id); 
        } catch (\Exception $e) { return response()->json(['message' => 'Error al inscribirse en el curso: ' . $e->getMessage()], 500);}

        return response()->json(['message' => 'Te has inscrito exitosamente en el curso.'], 200); // Asegurarse de que el código de estado es 200
    }
     
    public function getPurchasedCourses() 
    {
        $user = Auth::user(); // Verificar si el usuario está autenticado 
        if (!$user) {
            return redirect()->route('login')->with('message', 'Por favor inicia sesión para ver tus cursos comprados.'); 
        } 
        
        // Obtener los cursos a los que el usuario está inscrito
        $courses = $user->courses()->with('user')->get();
        return ($courses); 
    } 
    
    public function purchasedCourses() 
    { 
        $courses = $this->getPurchasedCourses(); 
        return view ('courses.purchased-courses', compact('courses')); 
    } 
    
    public function showPurchasedCourse($id) 
    { 
        $user = Auth::user(); 
        if (!$user) { 
            return response()->json(['message' => 'Usuario no autenticado.'], 401); 
        }
        $course = $user->courses()->where('course_student.id_course', $id)->with('user', 'contents')->first();
        
        if (!$course) { 
            return response()->json(['message' => 'No estás inscrito en este curso.'], 404); 
        } 
        
        return response()->json($course); 
    } 
    
    public function showPurchasedCourseView($id) 
    { 
        $user = Auth::user(); // Verificar si el usuario está autenticado 
        if (!$user) { 
            session()->flash('message', 'Debes iniciar sesión para acceder al curso.'); 
            return redirect()->route('login'); 
        } 
        
        // Obtener el curso al que el usuario está inscrito 
        $course = $user->courses()->where('course_student.id_course', $id)->with('user')->first(); 
        
        // Verificar si el usuario está inscrito en el curso 
        if (!$course) {
            session()->flash('message', 'No estás inscrito en este curso.'); 
            return redirect()->route('purchased-courses'); 
        } 
        
        return view('courses.show-purchased-course', compact('course')); 
    } 
    
    public function createContent(Request $request, $courseId) 
    { 
        $user = Auth::user(); 
        
        // Verificar si el usuario está autenticado 
        if (!$user) { 
            session()->flash('message', 'Debes iniciar sesión para añadir contenido.'); 
            return redirect()->route('login'); 
        }

        $course = Course::where('id_course', $courseId)->where('id_user', Auth::id())->firstOrFail(); 
        
        // Verificar si el usuario es propietario del curso 
        $request->validate([ 
            'title' => 'required|string|max:255', 
            'description' => 'required|string', 
            'video_url' => 'required|url', 
            'pdf_path' => 'nullable|file|mimes:pdf|max:10048', 
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|dimensions:ratio=16/9|max:2048', 
        ]); 
        
        if ($request->hasFile('pdf_path')) { 
            $pdfPath = $request->file('pdf_path')->store('pdfs', 'public'); 
        } 
        
        if ($request->hasFile('banner')) {
            $bannerPath = $request->file('banner')->store('banners', 'public'); 
        } 
        
        $courseContent = new CourseContent(); 
        $courseContent->id_course = $course->id_course; 
        $courseContent->title = $request->input('title'); 
        $courseContent->description = $request->input('description'); 
        $courseContent->video_url = $request->input('video_url'); 
        $courseContent->pdf_path = isset($pdfPath) ? $pdfPath : null; 
        $courseContent->banner = isset($bannerPath) ? $bannerPath : null; 
        $course->contents()->save($courseContent); 

        return redirect()->route('show_course', $course->id_course) ->with('success', 'Contenido del curso añadido exitosamente'); 
    } 
    
    public function addContentView($id) 
    { 
        $user = Auth::user(); 

        // Verificar si el usuario está autenticado 
        if (!$user) { 
            session()->flash('message', 'Debes iniciar sesión para añadir contenido.'); 
            return redirect()->route('login'); 
        } 
            
        // Verificar si el usuario es dueño del curso 
        $course = Course::where('id_course', $id)->where('id_user', Auth::id())->firstOrFail(); 
        if (!$course) { 
            session()->flash('message', 'No tienes permiso para añadir contenido a este curso.'); 
            return redirect()->route('home'); 
        } 
        
        return view('courses.add-content', compact('course')); 
    } 
        
    public function showCreatedContent($courseId) 
    { 
        $course = Course::where('id_course', $courseId) ->where('id_user', Auth::id()) ->with('contents') ->firstOrFail(); 
        return view('courses.created-contents', compact('course'));
    } 
    
    public function getCreatedContents($id) 
    { 
        $course = Course::where('id_course', $id) ->where('id_user', Auth::id()) ->with('contents') ->firstOrFail(); 
        return response()->json($course->contents); 
    } 
    
    public function getCourseContentById($id) 
    { 
        $content = CourseContent::findOrFail($id); 
        return response()->json($content); 
    }
    
    public function editContent($id) 
    { 
        $content = CourseContent::findOrFail($id); // Obtener el contenido por ID 
        return view('courses.edit-content', compact('content')); // Pasar los datos a la vista 
    }
    
    public function updateContent(Request $request, $id) 
    { 
        // Debug: Imprimir todos los datos recibidos 
        logger()->info('Datos recibidos: ', $request->all()); 
        
        $validatedData = $request->validate([ 
            'title' => 'required|string|max:255', 
            'description' => 'required|string', 
            'video_url' => 'required|url', 
            'pdf_path' => 'nullable|file|mimes:pdf|max:10048', 
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|dimensions:ratio=16/9|max:2048', 
        ]); 
        
        $content = CourseContent::findOrFail($id); 
        $content->title = $validatedData['title'];
        $content->description = $validatedData['description']; 
        $content->video_url = $validatedData['video_url']; 
        
        if ($request->hasFile('pdf_path')) {
            Storage::delete('public/' . $content->pdf_path);
                $content->pdf_path = $request->file('pdf_path')->store('pdfs', 'public');
        } else {
            $content->pdf_path = $request->input('pdf_path', $content->pdf_path); 
        } 
        
        if ($request->hasFile('banner')) {
            Storage::delete('public/' . $content->banner); 
            $content->banner = $request->file('banner')->store('banners', 'public'); 
        } else {
            $content->banner = $request->input('banner', $content->banner); 
        } 
        
        $content->save(); 
        return redirect()->route('created_content', $content->id_course) ->with('success', 'Contenido actualizado exitosamente'); 
    }
}