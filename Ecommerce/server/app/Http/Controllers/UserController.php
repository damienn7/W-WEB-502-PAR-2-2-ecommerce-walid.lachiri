<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function index(Request $request)
    {
        $end = $request->input('_end');  
        $start = $request->input('_start');  
        $articles = User::skip($start)->take($end-$start)->get();
        return response()
            ->json($articles, 200, ['X-Total-Count' => User::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }

    function create(Request $request)
    {
        $user = new User;
        $user->mail = $request->mail;
        $user->password = $request->password;
        $user->name = $request->name;
        $user->admin = 0;
        $user->save();
        return response()->json([
            "message" => "creation de l'User reussi",
            "Users" => $user,
        ], 201);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user, 200);
    }
    
    
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
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
