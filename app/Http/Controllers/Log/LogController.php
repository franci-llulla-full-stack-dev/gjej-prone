<?php

namespace App\Http\Controllers\Log;

use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $query = Log::with(['user', 'property', 'propertyRequest']);

        // Filter by user
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by action type
        if ($request->filled('action_type')) {
            $query->where('action_type', $request->action_type);
        }

        // Order by newest first
        $query->orderBy('created_at', 'desc');

        $logs = $query->paginate($request->per_page ?? 10);
        return Inertia::render('admin/Logs', [
            'logs' => $logs->items(),
            'pagination' => [
                'total' => $logs->total(),
                'current_page' => $logs->currentPage(),
                'last_page' => $logs->lastPage(),
                'prev_page_url' => $logs->previousPageUrl(),
                'next_page_url' => $logs->nextPageUrl(),
                'links' => $logs->linkCollection()->toArray(),
            ],
            'filters' => $request->all(),
            'users' => User::whereHas('logs')->get(['id', 'name', 'surname']),
            'action_types' => Log::select('action_type')->distinct()->pluck('action_type'),
        ]);
    }
}
