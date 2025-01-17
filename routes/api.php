<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/check-auth', [AuthController::class, 'checkAuth']);

Route::middleware('auth:sanctum')->get('/created-courses', [CourseController::class, 'getCreatedCourses']);

Route::middleware('auth:sanctum')->get('/courses/{id}', [CourseController::class, 'getCourse']);

// Ruta para inscribirse a un curso
Route::post('/courses/{id}/subscribe', [CourseController::class, 'subscribe']);

Route::middleware('auth:sanctum')->get('/purchased-courses', [CourseController::class, 'getPurchasedCourses']);

Route::middleware('auth:sanctum')->get('/purchased-courses/{id}', [CourseController::class, 'showPurchasedCourse']);

// Ruta para añadir contenido a un curso
Route::middleware('auth:sanctum')->post('/courses/{id}/contents', [CourseController::class, 'createContent'])->name('create_content');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/courses/{id}/contents', [CourseController::class, 'getCreatedContents'])->name('get_created_contents');
    Route::get('/course-contents/{id}', [CourseController::class, 'getCourseContentById'])->name('get_course_content_by_id');
    Route::put('/course-contents/{id}', [CourseController::class, 'updateCourseContent'])->name('update_course_content');    
});
