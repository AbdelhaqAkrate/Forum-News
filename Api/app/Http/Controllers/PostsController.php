<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Models\Post;
class PostsController extends Controller
{
       public function index()
    {
        $posts = Post::all();
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
                'image'=>$request->file('image')->store('images'),
                //  'image'=>"OIP (6).jpg",
                'user_id'=>$request->user_id,
                'categorie_id'=>$request->categorie_id
            ]
        );
            return response()->json([
                'message'=>"Post Created Successfully",
                'image' => $post['image']
            ]);
            
        }
        }
        public function update(Request $request,$id)
        {

             Post::find($id)
            ->update(['Content'=> $request->Content]);
            return response()->json([
                'message'=>"Post Updated Successfully",
            ]);
        }

        public function DeletePost($id)
        {
            $post=Post::find($id);
            $post->delete();
             return response()->json([
                'message'=>"Post Deleted Successfully",
            ]);
        }
    public function getPost(Request $request,$id)
    {
       $get= post::find($id);;
       return response()->json($get);
    }


     public function Like(Request $request,$id)
        {

             Post::find($id)
            ->update(['likes'=> $request->likes]);
            return response()->json([
                'message'=>"liked Successfully",
            ]);
        }

        public function DisLike(Request $request,$id)
        {

             Post::find($id)
            ->update(['dislikes'=> $request->dislikes]);
            return response()->json([
                'message'=>"liked Successfully",
            ]);
        }
        public function Search($search)
        {
             $search = Post::where('categorie_id', 'LIKE', '%'.$search.'%')->get();
               return response()->json($search);
        }
}
