<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{


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
            "message" => "Inscription réussie.",
            "user" => $user,
        ], 201);
    }

    public function indexUsers()
    {
        return User::all();
    }

    public function indexUser($id)
    {
        return User::findOrFail($id);
    }

    function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response([
            'message' => 'Infos du compte mises à jour',
            'donnees' => $user
        ]);
    }
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Le compte a été supprimé.']);
    }

}