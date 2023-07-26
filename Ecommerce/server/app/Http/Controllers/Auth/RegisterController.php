<?php

// RegisterController.php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'pseudo' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        User::create([
            'pseudo' => $request->pseudo,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'admin' => 0,
        ]);
        return redirect()->route('login')->with('success', 'Inscription réussie ! Vous pouvez maintenant vous connecter.');
    }
}
