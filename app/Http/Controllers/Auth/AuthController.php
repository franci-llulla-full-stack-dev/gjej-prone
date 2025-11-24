<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('auth/Login', []);
    }

    public function authenticate(LoginRequest $request)
    {
        $validated = $request->validated();
        $credentials = $request->only('email', 'password');
        if(Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route(redirectByRole());
        }
        return back()->withErrors([
            'email' => 'These credentials do not match our records.',
        ]);
    }

    public function register()
    {
        return Inertia::render('auth/Register', []);
    }

    public function storeRegistration(RegisterUserRequest $request)
    {
        $validatedData = $request->validated();
        $role = Role::query()
            ->where('name', $validatedData['user_type'])
            ->where('name', '!=', 'admin')
            ->first();
        if(!$role) return back()->withErrors("Invalid information.");
        $user = $role->users()->create([
            'name' => $validatedData['name'],
            'surname' => $validatedData['surname'],
            'phone_number' => $validatedData['phone_number'],
            'birth_date' => $validatedData['birth_date'],
            'email' => $validatedData['email'],
            'company_name' => $validatedData['company_name'] ?? null,
            'password' => bcrypt($validatedData['password']),
        ]);

        auth()->login($user);

        session()->flash('success', 'Regjistrimi u krye me sukses!');

        return redirect()->route(redirectByRole());
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        return Inertia::render('Landing', []);
    }
}
