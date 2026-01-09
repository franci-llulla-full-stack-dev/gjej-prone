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
