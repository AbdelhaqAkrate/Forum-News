<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Post;
class PostsController extends Controller
{
       public function index()
    {
        $posts = Post::inRandomOrder()->get();
        return response()->json($posts);
    }
        public function mostLikedPost()
        {
            $trend = Post::orderBy('likes', 'desc')->take(3)->get();
            return response()->json($trend);

        }
        public function post(Request $request)
        {
            $validator = Validator::make($request->all(), [
            'title' =>'required',
            'Content'=>'required',
            'categorie_id' =>'required',
            
        ]);
        if($validator->fails())
        {
            return response()->json([
                'error'=>$validator->messages(),
            ]);
        }
        else{
            $post = Post::create(
                [
                'title'=>$request->title,
                'Content'=>$request->Content,
                'likes'=>$request->likes,
                'dislikes'=>$request->dislikes,
                'image'=>$request->image,
                'user_id'=>$request->user_id,
                'categorie_id'=>$request->categorie_id
            ]
        );
            return response()->json([
                'message'=>"Post Created Successfully",
            ]);
        }
        }
}
