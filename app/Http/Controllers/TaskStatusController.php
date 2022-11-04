<?php

namespace App\Http\Controllers;

use App\TaskStatus;
use Illuminate\Http\Request;

class TaskStatusController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $taskStatuses = [];
        
        try {
            $taskStatuses = TaskStatus::all();

            $this->apiCode  = 200;
            $this->apiError = null;
        } catch (\Throwable $th) {
            $this->apiCode  = 500;
            $this->apiError = $th->getMessage();
        }

        return response()->json([
            'task_statuses' => $taskStatuses,
            'apiError'      => $this->apiError
        ], $this->apiCode);
    }
}
