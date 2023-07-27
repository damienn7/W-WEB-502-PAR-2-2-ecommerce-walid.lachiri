<?php

// LoginController.php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'pseudo' => 'required|string',
            'password' => 'required|string',
        ]);
        if (Auth::attempt(['pseudo' => $request->pseudo, 'password' => $request->password])) {
            return redirect()->intended('/');
        } else {
            return back()->with('error', 'Pseudo ou mot de passe incorrect.');
        }
    }
}
