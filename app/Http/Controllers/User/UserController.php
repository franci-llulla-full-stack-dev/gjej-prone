<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('role');
        if($request->status === 'deleted') {
            $query->onlyTrashed();
        }
        if($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('surname', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }
        if($request->filled('role_id')) {
            $query->where('role_id', $request->input('role_id'));
        }
        if($request->filled('verified')) {
            if($request->input('verified') === 'verified') {
                $query->whereNotNull('email_verified_at');
            } elseif($request->input('verified') === 'unverified') {
                $query->whereNull('email_verified_at');
            }
        }
        $users = $query->paginate($request->per_page ?? 5);
        return Inertia::render('admin/Users', [
            'users' => $users->items(),
            'pagination' => [
                'total' => $users->total(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'prev_page_url' => $users->previousPageUrl(),
                'next_page_url' => $users->nextPageUrl(),
                'links' => $users->linkCollection()->toArray(),
            ],
            'roles' => Role::query()->get()->select('name', 'id'),
            'filters' => $request->all(),
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'Perdoruesi u fshi!');
    }

    public function verify(User $user)
    {
        $user->update(['email_verified_at' => now()]);
        return back()->with('success', 'Perdoruesi u verifikua me sukses!');
    }

    public function restore($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();
        return back()->with('success', 'Perdoruesi u rikthye me sukses!');
    }

    public function forceDelete($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->forceDelete();
        return back()->with('success', 'Perdoruesi u fshi përgjithmonë!');
    }

    public function create()
    {
        return Inertia::render('admin/CreateUser',
        [
            'roles' => Role::all(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'birth_date' => 'nullable|date',
            'role_id' => 'required|exists:roles,id',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        User::create($validated);

        return redirect()->route('admin.users.index')
            ->with('success', 'Përdoruesi u krijua me sukses!');
    }

    public function update(User $user, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'birth_date' => 'nullable|date',
            'role_id' => 'required|exists:roles,id',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = bcrypt($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('admin.users.index')
            ->with('success', 'Përdoruesi u përditësua me sukses!');
    }
    public function edit(User $user)
    {
        return Inertia::render('admin/EditUser', [
            'user' => $user,
            'roles' => Role::all(['id', 'name']),
        ]);
    }

}
