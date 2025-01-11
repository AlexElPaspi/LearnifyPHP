<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Ruta para mostrar  la vista principal del usuario no loggeado
Route::get('/', function () {
    return view('welcome');
})->middleware('guest');

// Ruta para mostrar el formulario de registro
Route::get('register', [RegisterController::class, 'showRegistrationForm'])->name('register')->middleware('guest');

// Ruta para procesar los datos ingresados en el formulario de registro
Route::post('register', [RegisterController::class, 'register'])->middleware('guest');

// Ruta para mostrar el formulario de inicio de sesión
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login')->middleware('guest');

// Ruta para procesar los datos ingresados en el formulario de inicio de sesión
Route::post('login', [LoginController::class, 'login'])->middleware('guest');

// Ruta para procesar el cierre de sesión
Route::middleware('auth')->post('/logout', [AuthController::class, 'logout']);

// Rutas autenticadas...
Route::middleware('auth')->group(function () {
    // Ruta para mostrar la vista principal del usuario loggeado
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    // Ruta para mostrar la vista del perfil del usuario
    Route::get('/profile', function () {
        return view('auth.profile');
    });

    // Ruta para obtener los datos del usuario activo
    Route::get('/get-user', [AuthController::class, 'getUser']);

    // Ruta para verificar el estado de autenticación del usuario activo
    Route::get('/check-auth', [AuthController::class, 'checkAuth']);

    // Ruta para actualizar los datos de los usuarios desde la vista del perfil del usuario
    Route::post('/update-user', [UserController::class, 'update']);

    // Ruta para crear cursos
    Route::get('/create-course', [CourseController::class, 'create'])->name('create-course');
    Route::post('/create-course', [CourseController::class, 'store']);

    // Ruta para mostrar los cursos creados por el usuario
    Route::get('/created-courses', [CourseController::class, 'createdCourses'])->name('created-courses');

    // Ruta para editar cursos
    Route::get('/edit-course/{id}', [CourseController::class, 'edit'])->name('edit-course');
    Route::post('/update-course/{id}', [CourseController::class, 'update']);

    // Ruta para mostrar todos los cursos
    Route::get('/courses', [CourseController::class, 'showAllCourses'])->name('courses');

    // Ruta para obtener todos los cursos
    Route::get('/api/courses', [CourseController::class, 'getAllCourses']);

    // Ruta para obtener la vista informativa de un curso en específico
    Route::get('/courses/{id}', [CourseController::class, 'showCourse'])->name('course.show');

    // Ruta para obtener los cursos comprados por el usuario
    Route::get('/purchased-courses', [CourseController::class, 'purchasedCourses'])->name('purchased-courses');

    // Ruta para obtener la vista completa de un curso comprado por el usuario
    Route::get('/purchased-courses/{id}', [CourseController::class, 'showPurchasedCourseView'])->name('show-purchased-course');

    // Ruta para añadir contenido a un curso
    Route::get('/add-content/{id}', [CourseController::class, 'addContentView'])->name('add-content');

    Route::get('/courses/{id}', [CourseController::class, 'showCourse'])->name('show_course');
});