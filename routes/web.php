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
// Route::post('logout', [LoginController::class, 'logout'])->name('logout');

// Ruta para mostrar la vista principal del usuario loggeado
Route::get('/home', [HomeController::class, 'index'])->middleware('auth')->name('home');

// Ruta para mostrar la vista del perfil del usuario
Route::middleware('auth')->get('/profile', function(){
    return view('auth.profile');
});

// Ruta para obtener los datos del usuario activo
Route::middleware('auth')->get('/get-user', [AuthController::class, 'getUser']);

// Ruta para verificar el estado de autenticación del usuario activo
Route::middleware('auth')->get('/check-auth', [AuthController::class, 'checkAuth']);

// Ruta para actualizar los datos de los usuarios desde la vista del perfil del usuario
Route::middleware('auth')->post('/update-user', [UserController::class, 'update']);

// Ruta para procesar el cierre de sesión
Route::middleware('auth')->post('/logout', [AuthController::class, 'logout']);

// Ruta para mostrar la vista de creación de cursos
Route::middleware('auth')->get('/create-course', [CourseController::class, 'create'])->name('create-course');

// Ruta para procesar los datos ingresados en el formulario de creación de cursos
Route::middleware('auth')->post('/create-course', [CourseController::class, 'store']);

// Ruta para obtener y mostrar los cursos creados por el usuario activo
Route::middleware('auth')->get('/created-courses', [CourseController::class, 'createdCourses'])->name('created-courses');

// Ruta para mostrar el formulario de edición de cursos
Route::middleware('auth')->get('/edit-course/{id}', [CourseController::class, 'edit'])->name('edit-course');

// Ruta para enviar y procesar la edición de cursos
Route::middleware('auth')->post('/update-course/{id}', [CourseController::class, 'update']);

// Ruta para mostrar todos los cursos
Route::middleware('auth')->get('/courses', [CourseController::class, 'showAllCourses'])->name('courses');

// Ruta para obtener todos los cursos
Route::middleware('auth')->get('/api/courses', [CourseController::class, 'getAllCourses']);

// Ruta para obtener la vista de un curso en específico
Route::middleware('auth')->get('/courses/{id}', [CourseController::class, 'showCourse'])->name('course.show');