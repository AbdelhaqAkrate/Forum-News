<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCommentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCommentRequest $request)
    {
        //
    }
      public function postComment(Request $request)
        {
            $validator = Validator::make($request->all(), [
            'body' =>'required',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'error'=>$validator->messages(),
            ]);
        }
        else{

            $comment = Comment::create(
                [
                'body'=>$request->body,
                'post_id'=>$request->post_id,
                'user_id'=>$request->user_id
            ]
        );
            return response()->json([
                'message'=>"Your comment sent Successfully",
            ]);
            
        }
        }

           public function DeleteComment($id)
        {
            $comment=Comment::find($id);
            $comment->delete();
             return response()->json([
                'message'=>"Comment Deleted Successfully",
            ]);
        }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
    }
   public function comments()
    {
        $comments = Comment::all();
        return response()->json($comments);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCommentRequest  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
       $comments= Comment::find($id);;
       return response()->json($comments);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
