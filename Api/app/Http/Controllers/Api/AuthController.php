<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
        public function index()
    {
        $users = User::all();
        // return view('products.index', compact('products'))->with(request()->input('page'));
        return response()->json($users);
    }
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' =>'required',
            'email'=>'required|email|max:200|unique:users,email',
            'password' =>'required|min:6',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'error'=>$validator->messages(),
            ]);
        }
        else{
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);
            $Token=$user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$Token,
                'message'=>"Account Created Successfully",
            ]);
        }
    }

    public function login(Request $request)
    {
          $validator = Validator::make($request->all(), [
            'email'=>'required|email|max:200',
            'password' =>'required',
        ]); 
        if($validator->fails())
        {
            return response()->json([
                'error'=>$validator->messages(),
              
            ]);
        }
        else{
            $user = User::where('email',$request->email)->first();

            if(! $user || ! Hash::check($request->password, $user->password))
            {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Account'
                ]);
            }
            else{
                 $Token=$user->createToken($user->email.'_Token')->plainTextToken;
                 return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'user_id'=>$user->id,
                'token'=>$Token,
                'message'=>"You Have Logged Successfully",
            ]);
            }
        }
        
    }
       public function updateUser(Request $request,$id)
           {
                $validator = Validator::make($request->all(), [
            "name" => "required|min:4",
            "password" => "nullable|min:6",
        ]); 
           if($validator->fails())
        {
            return response()->json([
                'error'=>$validator->messages(),
              
            ]);
        }
        else
       { $user = User::find($id);
        $user->name = $request->name;
        if ($request->password) {
            $user->password = bcrypt($request->password);
        }
        $user->save();
         return response()->json([
                'message'=>"account updated Successfully",
            ]);}
           }
          public function getUser(Request $request,$id)
            {
            $get= User::find($id);;
            return response()->json($get);
            }

             public function DeleteUser($id)
        {
            $user=User::find($id);
            
            $user->delete();
            $post = Post::where('user_id', $id)->delete();
            $post = Comment::where('user_id', $id)->delete();
             return response()->json([
                'message'=>"user Deleted Successfully",
            ]);
        }

}
