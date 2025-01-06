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

Route::middleware('auth:api')->get('/check-auth', [AuthController::class, 'checkAuth']);

Route::middleware('auth:sanctum')->get('/created-courses', [CourseController::class, 'getCreatedCourses']);

Route::middleware('auth:sanctum')->get('/courses/{id}', [CourseController::class, 'getCourse']);