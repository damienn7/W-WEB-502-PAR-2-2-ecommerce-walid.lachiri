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
Route::post('users/', [UserController::class, 'create']);
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
Route::get('nomserieux/{id}', [ArticleController::class, 'methodetotalementraisonnable']);
Route::get('articles/{id}', [ArticleController::class, 'show']);
// --------------------------------

// G̸̝̼͔̓͆͝a̴͓̟̠̚͝͝m̴̻̘͋͠͠e̴̡͓͙̓̈́̒
// READ | WHERE | ORDER BY

// Route::get('articles/search?q={search}&c={category}&sc={sub_category}', [ArticleController::class, 'search']);

// G̸̝̼͔̓͆͝a̴͓̟̠̚͝͝m̴̻̘͋͠͠e̴̡͓͙̓̈́̒

// UPDATE
Route::put('articles/{id}', [ArticleController::class, 'update']);
// --------------------------------


// Delete
Route::delete('articles/{id}/', [ArticleController::class, 'destroy']);
// --------------------------------
// G̸̝̼͔̓͆͝a̴͓̟̠̚͝͝m̴̻̘͋͠͠e̴̡͓͙̓̈́̒
// READ | WHERE | ORDER BY

//CRUD Utilisateur
Route::post('users/', [UserController::class, 'create']);
Route::get('users/', [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::put('users/{id}/', [UserController::class, 'update']);
Route::delete('users/{id}/', [UserController::class, 'delete']);



// CREATE
Route::post('order', [OrderController::class, 'create']);
// --------------------------------

// READ 
Route::get('order', [OrderController::class, 'index']);
Route::get('order/{id}', [OrderController::class, 'show']);
// --------------------------------

// UPDATE 
Route::put('order/{id}', [OrderController::class, 'update']);
// --------------------------------


// Delete 
Route::delete('order/{id}/', [OrderController::class, 'destroy']);
// --------------------------------

//CRUD Categories pour ADMIN ONLY ATTENTION
Route::post("categories/", [CategoriesController::class, "create"]);
Route::get("categories/", [CategoriesController::class, "index"]);
Route::get("categories/{id}", [CategoriesController::class, "show"]);
Route::put("categories/{id}", [CategoriesController::class, "update"]);
Route::delete("categories/{id}", [CategoriesController::class, "delete"]);

// CREATE
Route::post('rating', [RatingController::class, 'create']);
// --------------------------------

// READ 
Route::get('rating', [RatingController::class, 'index']);
Route::get('rating/{id}', [RatingController::class, 'show']);
// --------------------------------

// UPDATE 
Route::put('rating/{id}', [RatingController::class, 'update']);
// --------------------------------


// Delete 
Route::delete('rating/{id}/', [RatingController::class, 'destroy']);
// --------------------------------




// CREATE
Route::post('order_item', [Order_itemController::class, 'create']);
// --------------------------------

// READ 
Route::get('order_item', [Order_itemController::class, 'index']);
Route::get('order_item/{id}', [Order_itemController::class, 'show']);
// --------------------------------

// UPDATE 
Route::put('order_item/{id}', [Order_itemController::class, 'update']);
// --------------------------------


// Delete 
Route::delete('order_item/{id}/', [Order_itemController::class, 'destroy']);
// --------------------------------
Route::get('articles/search/{category}/{sub_category}', [ArticleController::class, 'searchNavigation']);
Route::get('articles/search/{category}/{sub_category}/{id}', [ArticleController::class, 'searchNavigation']);

// G̸̝̼͔̓͆͝a̴͓̟̠̚͝͝m̴̻̘͋͠͠e̴̡͓͙̓̈́̒


// //CRUD Utilisateur
// Route::post('users/', [UserController::class, 'createUser']);
// Route::get('users/', [UserController::class, 'indexUsers']);
// Route::get('users/{id}', [UserController::class, 'indexUser']);
// Route::put('users/{id}/', [UserController::class, 'updateUser']);
// Route::delete('users/{id}/', [UserController::class, 'deleteUser']);

// //CRUD Categories pour ADMIN ONLY ATTENTION
// Route::post("categories/", [CategoriesController::class, "createCategory"]);
// Route::get("categories/", [CategoriesController::class, "showCategories"]);
// Route::get("categories/{id}", [CategoriesController::class, "showCategory"]);
// Route::put("categories/{id}", [CategoriesController::class, "updateCategory"]);
// Route::delete("categories/{id}", [CategoriesController::class, "deleteCategory"]);

//Route suggestion dans la recherche
Route::get('articles/searchSuggestion/{request}', [ArticleController::class, 'searchSuggestion']);
Route::get('categories', [CategoriesController::class, 'showCategories']);