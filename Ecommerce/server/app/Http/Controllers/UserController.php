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
        $User = new User;
        $User->image = $request->image;
        $User->name = $request->name;
        $User->description = $request->description;
        $User->price = $request->price;
        $User->caracteristiques_id = $request->caracteristiques_id;
        $User->stocks_id = $request->stocks_id;
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
}