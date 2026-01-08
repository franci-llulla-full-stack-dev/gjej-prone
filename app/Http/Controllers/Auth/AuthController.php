<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\Role;
use App\Models\User;
use App\Notifications\CustomVerifyEmail;
use App\Notifications\ResetPasswordAl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
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
            'email' => 'Këto kredenciale nuk përputhen me të dhënat tona.',
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
        if(!$role) return back()->withErrors("Informacion i pavlefshëm.");
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
            return back()->withErrors("Diçka shkoi keq.");
        }
        dispatch(function () use ($user) {
            $user->notify(new CustomVerifyEmail($user));
        });
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
            abort(403, 'Linku i verifikimit është i pavlefshëm ose ka skaduar.');
        }
        if (! hash_equals(hash_hmac('sha256', $id, config('app.key')), $hash)) {
            abort(403, 'Linku i verifikimit është i pavlefshëm.');
        }

        $user = User::findOrFail($id);
        $user->update(['email_verified_at' => now()]);

        return redirect()->route(redirectByRole())->with('status', 'Email-i u verifikua me sukses. Ju lutemi, hyni në llogari.');
    }

    public function forgotPassword()
    {
        return Inertia::render('auth/ForgotPassword', []);
    }

    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Nuk u gjet asnjë përdorues me këtë email.']);
        }

        $token = app('auth.password.broker')->createToken($user);
        dispatch(function () use ($user, $token) {
            $user->notify(new ResetPasswordAl($token));
        });

        return back()->with('success', 'Email për rivendosjen e fjalëkalimit u dërgua me sukses!');
    }

    public function resetPassword(Request $request)
    {
        // 1️⃣ Validate inputs
        $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed'],
        ], [
            'email.required' => 'Email-i është i detyrueshëm.',
            'email.email' => 'Email-i nuk është valid.',
            'password.required' => 'Fjalëkalimi është i detyrueshëm.',
            'password.confirmed' => 'Fjalëkalimet nuk përputhen.',
            'password.min' => 'Fjalëkalimi duhet të ketë së paku 8 karaktere.',
            'token.required' => 'Tokeni është i detyrueshëm.',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status === Password::INVALID_TOKEN) {
            return back()->with('error', 'Ky link i rivendosjes nuk është valid ose ka skaduar.');
        }

        if ($status === Password::INVALID_USER) {
            return back()->withErrors(['email' => 'Ky email nuk ekziston në sistem.']);
        }
        return redirect()->route('login')->with('success', 'Fjalëkalimi u ndryshua me sukses. Mund të hyni tani.');
    }
}
