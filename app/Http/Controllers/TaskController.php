<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tasks = [];

        try {
            $user  = $request->user();
            $tasks = Task::where('user_id', $user->id)->with('taskStatus')->get();

            $this->apiCode  = 200;
            $this->apiError = null;
        } catch (\Throwable $th) {
            $this->apiCode  = 500;
            $this->apiError = $th->getMessage();
        }

        return response()->json([
            'apiError' => $this->apiError,
            'tasks'    => $tasks
        ], $this->apiCode);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TaskRequest $request)
    {
        try {
            $dataTask            = $request->validated();
            $dataTask['user_id'] = $request->user()->id;

            Task::create($dataTask);

            $this->apiCode    = 201;
            $this->apiError   = null;
            $this->apiMessage = 'Tarea agregada correctamente';
        } catch (\Throwable $th) {
            $this->apiCode  = 500;
            $this->apiError = $th->getMessage();
            $this->apiMessage = 'No se pudo agregar la tarea';
        }

        return response()->json([
            'apiError' => $this->apiError,
            'message'  => $this->apiMessage
        ], $this->apiCode);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TaskRequest $request, $id)
    {
        try {
            $dataTask = $request->validated();

            $task = Task::findOrFail($id);
            $task->update($dataTask);

            $this->apiCode    = 201;
            $this->apiError   = null;
            $this->apiMessage = ($task->task_status_id === 3)
            ? 'Felicitaciones por lograrlo!'
            : 'Tarea actualizada correctamente';
        } catch (\Throwable $th) {
            $this->apiCode  = 500;
            $this->apiError = $th->getMessage();
            $this->apiMessage = 'No se pudo actualizar la tarea';
        }

        return response()->json([
            'apiError'    => $this->apiError,
            'message'     => $this->apiMessage,
            'task_status' => $task->task_status_id
        ], $this->apiCode);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
