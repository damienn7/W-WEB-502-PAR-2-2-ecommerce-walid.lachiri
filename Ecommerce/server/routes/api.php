<?php

use App\Http\Controllers\StripeController;
use Illuminate\Http\Request;
use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CharacteristicsController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Order_itemController;
use App\Http\Controllers\ShippingFeeController;
use Illuminate\Support\Facades\DB;



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
Route::post('notedefou', [RatingController::class, 'create']);
// --------------------------------

// READ
Route::get('articles', [ArticleController::class, 'index']);
Route::get('gozizi', [ArticleController::class, 'peripheriquenordsortieA3']);
Route::get('gozizi_test', [ArticleController::class, 'METHODEDEFILSDEPUTE']);
Route::get('ratingavg', [ArticleController::class, 'averagerating']);
Route::get('nomserieux/{id}', [ArticleController::class, 'methodetotalementraisonnable']);
Route::get('articles/{id}', [ArticleController::class, 'show']);
// --------------------------------


// Route::get('articles/search?q={search}&c={category}&sc={sub_category}', [ArticleController::class, 'search']);

// UPDATE
Route::put('articles/{id}', [ArticleController::class, 'update']);
// --------------------------------

// Delete
Route::delete('articles/{id}/', [ArticleController::class, 'destroy']);
// --------------------------------

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
Route::get('order/user/{id}', [OrderController::class, 'order_user']);
Route::get('order/{id}', [OrderController::class, 'show']);
Route::get('order/by/{id}', [OrderController::class, 'showByUserId']);
Route::get('order/user/{id}', [OrderController::class, 'overall']);
Route::get('order/user/command/{id}', [OrderController::class, 'showCommands']);


// UPDATE 
Route::put('order/{id}', [OrderController::class, 'update']);
Route::get('orderid/{id}', [OrderController::class, 'showorder']);

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
Route::get('rating/{userId}/{articleId}',[RatingController::class, 'checkNote']);
Route::get('comments/{id}',[RatingController::class, 'getRatingsWithUserNames']);


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
Route::get('order_item/by/{id}', [Order_itemController::class, 'showByOrderId']);
Route::get('order_item', [Order_itemController::class, 'index']);
Route::get('order_item/{id}', [Order_itemController::class, 'show']);
// --------------------------------

// UPDATE 
Route::put('order_item/{id}', [Order_itemController::class, 'update']);
// --------------------------------

// GET
Route::get('count_item/{id}',[Order_itemController::class, 'countItem']);
// count quantity*

// Delete 
Route::delete('order_item/{id}/', [Order_itemController::class, 'destroy']);
// --------------------------------
Route::get('articles/search/{category}/{sub_category}', [ArticleController::class, 'searchNavigation']);
Route::get('articles/search/{category}/{sub_category}/{id}', [ArticleController::class, 'searchNavigation']);


//Route suggestion dans la recherche
Route::get('articles/searchSuggestion/{request}', [ArticleController::class, 'searchSuggestion']);
Route::get('categoriess', [CategoriesController::class, 'showCategories']); 

//Route for payment (method post)

Route::post('checkout/{token}', [StripeController::class, 'checkout']);
Route::post('checkoutPanier/{id}', [StripeController::class, 'checkoutPanier']);
Route::get('successPanier/{id}', [StripeController::class, 'successPanier']);
Route::post("success/{token}", [StripeController::class, 'success']);
Route::get('ratingavg/{id}', [ArticleController::class, 'averagerating']);
Route::get('characteristic/{id}', [CharacteristicsController::class, 'showCharacteristics']);
Route::get('characteristic/', [CharacteristicsController::class, 'index']);


//CRUD Categories pour ADMIN ONLY ATTENTION
Route::post("shippingfee/", [ShippingFeeController::class, "create"]);
Route::get("shippingfee/", [ShippingFeeController::class, "index"]);
Route::get("shippingfee/{id}", [ShippingFeeController::class, "show"]);
Route::get("shippingfee/pays/{country}", [ShippingFeeController::class, "pays"]);

Route::put("shippingfee/{id}", [ShippingFeeController::class, "update"]);
Route::delete("shippingfee/{id}", [ShippingFeeController::class, "delete"]);
Route::get('/checkCountryBan/{country}',[ShippingFeeController::class, "checkBanStatus"]);
