<?php

use Illuminate\Http\Request;

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

/* use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController; */

Route::group(['prefix' => 'auth'], function () {
    Route::get('sanctum/csrf-cookie','\Laravel\Sanctum\Http\Controllers\CsrfCookieController@show');
    Route::post('login', 'Auth\LoginController@login')->name('login');
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');
});

Route::middleware(['auth:sanctum'])->group(function () {
    //Task statuses
    Route::get('task-statuses', 'TaskStatusController');

    //Tasks
    Route::apiResource('tasks','TaskController');
});