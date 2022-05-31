<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostsController::class, 'index'],);
Route::get('/comments', [CommentController::class, 'comments'],);
Route::get('/post/{id}', [PostsController::class, 'getPost'],);
Route::get('/DeletePost/{id}', [PostsController::class, 'DeletePost'],);
Route::get('/DeleteComment/{id}', [CommentController::class, 'DeleteComment'],);
Route::get('/Search/{id}', [PostsController::class, 'Search'],);
Route::post('/updatePost/{id}', [PostsController::class, 'update'],);
Route::post('/Like/{id}', [PostsController::class, 'Like'],);
Route::post('/DisLike/{id}', [PostsController::class, 'DisLike'],);
Route::post('create',[PostsController::class,'post']);
Route::post('comment',[CommentController::class,'postComment']);
Route::get('/categories', [CategoriesController::class, 'index'],);
Route::get('/trend', [PostsController::class, 'mostLikedPost'],);
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::get('users',[AuthController::class,'index']);
Route::post('newAdmin',[AdminController::class,'register']);
Route::post('admin',[AdminController::class,'login']);
Route::get('/DeleteUser/{id}', [AuthController::class, 'DeleteUser'],);
Route::post('/updateUser/{id}',[AuthController::class, 'updateUser']);
Route::get('/info/{id}',[AuthController::class, 'getUser']);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
