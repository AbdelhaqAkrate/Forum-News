<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
        public function index()
    {
        $products = User::all();
        // return view('products.index', compact('products'))->with(request()->input('page'));
        return response()->json($products);
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
}
