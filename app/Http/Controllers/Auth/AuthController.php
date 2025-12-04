<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\Role;
use App\Models\User;
use App\Notifications\CustomVerifyEmail;
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

        if(!$user){
           return back()->withErrors("Something went wrong.");
        }
        $user->notify(new CustomVerifyEmail($user));
        auth()->login($user);

        session()->flash('success', 'Regjistrimi u krye me sukses!');

        return redirect()->route(redirectByRole());
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        return redirect()->to('/');
    }

    public function verifyEmail(Request $request, $id, $hash)
    {
        if (! $request->hasValidSignature()) {
            abort(403, 'Invalid or expired verification link.');
        }
        if (! hash_equals(hash_hmac('sha256', $id, config('app.key')), $hash)) {
            abort(403, 'Invalid verification link.');
        }

        $user = User::findOrFail($id);
        $user->update(['email_verified_at' => now()]);

        return redirect()->route(redirectByRole())->with('status', 'Email verified successfully. Please log in.');
    }
}
