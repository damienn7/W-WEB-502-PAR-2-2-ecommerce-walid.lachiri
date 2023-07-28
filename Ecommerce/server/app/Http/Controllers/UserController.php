<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    function createUser(Request $request)
    {
        $user = new User;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->admin = $request->admin;
        $user->created_at = $request->created_at;
        $user->update_at = $request->update_at;
        $user->remember_token = $request->remember_token;
        $user->email_verified_at = $request->email_verified_at;
        //    $user->caracteristiques_id = $request->caracteristiques_id;  
        $user->pseudo = $request->pseudo;
        $user->save();
        return response()->json([
            "message" => "Inscription réussie. ",
            "user" => $user,
        ], 201);
    }

}