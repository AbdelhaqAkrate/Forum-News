<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    
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
            $admin = Admin::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);
            $Token=$admin->createToken($admin->email.'_Token')->plainTextToken;
            return response()->json([
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
            $admin = Admin::where('email',$request->email)->first();

            if(! $admin || ! Hash::check($request->password, $admin->password))
            {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Account'
                ]);
            }
            else{
                 $Token=$admin->createToken($admin->email.'_Token')->plainTextToken;
                 return response()->json([
                'status'=>200,
                'adminName'=>$admin->name,
                'admin_id'=>$admin->id,
                'adminToken'=>$Token,
                'message'=>"You Have Logged Successfully",
            ]);
            }
        }
        
    }
}
