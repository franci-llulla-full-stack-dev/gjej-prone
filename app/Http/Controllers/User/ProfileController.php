<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Profile', [
            'user' => auth()->user(),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'surname' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:254', 'unique:users,email,' . $user->id],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'address' => ['nullable', 'string', 'max:255'],
            'notifications' => ['boolean'],
            // Extra fields
            'nipt' => ['nullable', 'string', 'max:20'],
            'company_phone_number' => ['nullable', 'string', 'max:30'],
            'years_experience' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'company_description' => ['nullable', 'string', 'max:1000'],
            'logo' => ['nullable', 'image', 'max:2048'], // 2MB max
            'finished_projects' => ['nullable', 'numeric', 'min:0', 'max:10000'],
            'website' => ['nullable', 'string', 'url', 'max:255'],
            'year_budget' => ['nullable', 'numeric', 'min:0'],
            'preferred_locations' => ['nullable', 'string', 'max:500'],
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($user->logo_path && \Storage::disk('public')->exists($user->logo_path)) {
                \Storage::disk('public')->delete($user->logo_path);
            }

            // Store new logo
            $logoPath = $request->file('logo')->store('logos', 'public');
            $validated['logo_path'] = $logoPath;
        }

        // Remove logo from validated data as it's already handled
        unset($validated['logo']);

        $user->update($validated);

        return back()->with('success', 'Profili u perditesua me sukses.');
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => ['required'],
            'new_password' => [
                'required',
                'confirmed',
            ],
        ]);
        if (! Hash::check($request->current_password, $user->password)) {
            return back()->withErrors([
                'current_password' => 'Fjalekalimi aktual nuk eshte i sakte.',
            ]);
        }
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return back()->with('success', 'Fjalekalimi u ndryshua me sukses.');
    }

    public function deleteAccount()
    {
        $user = auth()->user();
        $user->delete();

        auth()->logout();

        return redirect()->route('landing')->with('success', 'Llogaria juaj u fshi me sukses.');
    }
}
