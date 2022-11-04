<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';

    protected $fillable = [
        'description',
        'due_date',
        'user_id',
        'task_status_id'
    ];

    protected $appends = ['task_lated'];

    //Relations
    public function taskStatus()
    {
        return $this->belongsTo(TaskStatus::class);
    }

    public function getTaskLatedAttribute()
    {
        return ($this->attributes['due_date'] < now()); 
    }
}
