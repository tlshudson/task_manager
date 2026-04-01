<?php
require_once __DIR__ . '/../config/Database.php';

class Task
{
    public function getAll()
    {
        return Database::query("SELECT * FROM tasks");
    }
    public function getId($id)
    {
        return Database::queryId("SELECT * FROM tasks WHERE id = ?", [$id]);
    }
    public function create($titulo)
    {
        return Database::insert("INSERT INTO tasks (title) VALUES (?)", [$titulo]);
    }
    public function delete($id)
    {
        return Database::delete("DELETE FROM tasks WHERE id = ?", [$id]);
    }
    public function update($id, $dados)
    {
        $parametros = [
            $dados['title'],
            $dados['status'],
            $dados['category'],
            $id
        ];
        return Database::update("UPDATE tasks SET title = ?, status = ?, category = ? WHERE id = ?", $parametros);
    }
}
