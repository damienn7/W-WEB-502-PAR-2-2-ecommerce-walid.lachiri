<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function index()
    {
        return User::all();
    }

    function createUser(Request $request)
    {
        $User = new User;
        $User->mail = $request->mail;
        $User->password = $request->password;
        $User->name = $request->name;
        $User->admin = 1;
        $User->save();
        return response()->json([
            "message" => "creation de l'User reussi",
            "Users" => $User,
        ], 201);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    function update(Request $request, $id)
    {
        $User = User::findOrFail($id);
        $User->update($request->all());
        return response([
            'message' => 'mise a jour de User reussi',
            'donnees' => $User
        ]);
    }

    public function destroy($id)
    {
        $User = User::findOrFail($id);
        $User->delete();
        return response()->json(['message' => 'User supprimé correctement']);
    }
    public function login(Request $request)
    {
        $credentials = $request->only('mail', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json([
                'message' => 'Connexion réussie',
                'user' => $user,
                'token' => $token,
            ]);
        } else {
            return response()->json([
                'message' => 'Identifiants invalides',
            ], 401);
        }
    }
}