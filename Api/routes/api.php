<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostsController::class, 'index'],);
Route::post('create',[PostsController::class,'post']);
Route::get('/categories', [CategoriesController::class, 'index'],);
Route::get('/trend', [PostsController::class, 'mostLikedPost'],);
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
