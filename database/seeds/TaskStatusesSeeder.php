<?php

use App\TaskStatus;
use Illuminate\Database\Seeder;

class TaskStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TaskStatus::truncate();

        TaskStatus::create(['name' => 'To do']);

        TaskStatus::create(['name' => 'Working']);

        TaskStatus::create(['name' => 'Done']);
    }
}
