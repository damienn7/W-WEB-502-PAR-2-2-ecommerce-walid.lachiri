<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{


    function createUser(Request $request)
    {
        $user = new User;
        $user->name = $request->name;
        $user->mail = $request->mail;
        $user->password = $request->password;
        $user->admin = $request->admin;
        $user->remember_token = $request->remember_token;
        $user->email_verified_at = $request->email_verified_at;
        $user->save();
        return response()->json([
            "message" => "Inscription réussie.",
            "user" => $user,
        ], 201);
    }

    public function indexUsers(Request $request)
    {
        $end = $request->input('_end');  
        $start = $request->input('_start');  
        $user = User::all()->skip($start)->take($end-$start)->values();
        return response()
            ->json($user, 200, ['X-Total-Count' => User::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);    }

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