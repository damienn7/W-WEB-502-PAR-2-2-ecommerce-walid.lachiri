<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// CREATE
Route::post('articles/', [ArticleController::class, 'createArticle']);
// --------------------------------

// READ 
Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/{id}', [ArticleController::class, 'show']);
// --------------------------------

// UPDATE 
Route::put('articles/{id}', [ArticleController::class, 'update']);
// --------------------------------


// Delete 
Route::delete('articles/{id}/', [ArticleController::class, 'destroy']);
// --------------------------------




