<?php
require_once __DIR__ . '/../config/Database.php';

class Task
{
    public function getAll()
    {
        return Database::query("SELECT * FROM tasks");
    }
    public function create($titulo)
    {
        return Database::query("INSERT INTO tasks (title) VALUES (?)", [$titulo]);
    }
}
