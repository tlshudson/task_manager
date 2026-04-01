<?php

require_once __DIR__ . '/../models/Task.php';

class TaskController
{
    public function listar()
    {
        $taskModel = new Task();
        $tasks = $taskModel->getAll();
        http_response_code(200);
        echo json_encode($tasks);
    }
    public function inserir()
    {
        $json = file_get_contents('php://input');
        $dados = json_decode($json, true);
        $createTask = new Task();
        $tasksCreated = $createTask->create($dados['title']);
        if ($tasksCreated) {
            http_response_code(201);
            echo json_encode($tasksCreated);
            } else {
            http_response_code(405);
            echo json_encode($tasksCreated);
        }
    }
}
