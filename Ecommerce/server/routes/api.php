<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Order_itemController;


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
Route::post('users/', [UserController::class, 'createUser']);
// --------------------------------

// READ 
Route::get('users', [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']);
// --------------------------------

// UPDATE 
Route::put('users/{id}', [UserController::class, 'update']);
// --------------------------------


// Delete 
Route::delete('users/{id}/', [UserController::class, 'destroy']);
// --------------------------------

// Login
Route::post('users/login', [UserController::class, 'login']);



// CREATE
Route::post('users/', [UserController::class, 'createUser']);
// --------------------------------

// READ 
Route::get('users', [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']);
// --------------------------------

// UPDATE 
Route::put('users/{id}', [UserController::class, 'update']);
// --------------------------------


// Delete 
Route::delete('users/{id}/', [UserController::class, 'destroy']);
// --------------------------------

// Login
Route::post('users/login', [UserController::class, 'login']);



// CREATE
Route::post('articles', [ArticleController::class, 'createArticle']);
// --------------------------------

// READ 
Route::get('articles', [ArticleController::class, 'index']);
Route::get('gozizi', [ArticleController::class, 'METHODEDEFILSDEPUTE']);
Route::get('articles/{id}', [ArticleController::class, 'show']);
// --------------------------------

// UPDATE 
Route::put('articles/{id}', [ArticleController::class, 'update']);
// --------------------------------
    

// Delete 
Route::delete('articles/{id}/', [ArticleController::class, 'destroy']);
// --------------------------------

//CRUD Utilisateur
Route::post('users/', [UserController::class, 'createUser']);
Route::get('users/', [UserController::class, 'indexUsers']);
Route::get('users/{id}', [UserController::class, 'indexUser']);
Route::put('users/{id}/', [UserController::class, 'updateUser']);
Route::delete('users/{id}/', [UserController::class, 'deleteUser']);



// CREATE
Route::post('order', [OrderController::class, 'createOrder']);
// --------------------------------

// READ 
Route::get('order', [OrderController::class, 'indexOrder']);
Route::get('order/{id}', [OrderController::class, 'showOrder']);
// --------------------------------

// UPDATE 
Route::put('order/{id}', [OrderController::class, 'updateOrder']);
// --------------------------------


// Delete 
Route::delete('order/{id}/', [OrderController::class, 'destroyOrder']);
// --------------------------------

//CRUD Categories pour ADMIN ONLY ATTENTION
Route::post("categories/", [CategoriesController::class, "createCategory"]);
Route::get("categories/", [CategoriesController::class, "showCategories"]);
Route::get("categories/{id}", [CategoriesController::class, "showCategory"]);
Route::put("categories/{id}", [CategoriesController::class, "updateCategory"]);
Route::delete("categories/{id}", [CategoriesController::class, "deleteCategory"]);

// CREATE
Route::post('rating', [RatingController::class, 'createRating']);
// --------------------------------

// READ 
Route::get('rating', [RatingController::class, 'indexRating']);
Route::get('rating/{id}', [RatingController::class, 'showRating']);
// --------------------------------

// UPDATE 
Route::put('rating/{id}', [RatingController::class, 'updateRating']);
// --------------------------------


// Delete 
Route::delete('rating/{id}/', [RatingController::class, 'destroyRating']);
// --------------------------------




// CREATE
Route::post('order_item', [Order_itemController::class, 'createOrder_item']);
// --------------------------------

// READ 
Route::get('order_item', [Order_itemController::class, 'indexOrder_item']);
Route::get('order_item/{id}', [Order_itemController::class, 'showOrder_item']);
// --------------------------------

// UPDATE 
Route::put('order_item/{id}', [Order_itemController::class, 'updateOrder_item']);
// --------------------------------


// Delete 
Route::delete('order_item/{id}/', [Order_itemController::class, 'destroyOrder_item']);
// --------------------------------