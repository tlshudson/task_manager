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
        public function listarId($id)
    {
        $taskModel = new Task();
        $task = $taskModel->getId($id);
        http_response_code(200);
        echo json_encode($task);
    }
    public function inserir()
    {
        $json = file_get_contents('php://input');
        $dados = json_decode($json, true);
        $createTask = new Task();
        $tasksCreated = $createTask->create($dados['title']);
        if ($tasksCreated) {
            http_response_code(201);
            echo json_encode(["id" => $tasksCreated, "message" => "Tarefa Criada!"]);
        } else {
            http_response_code(400);
        }
    }
    public function deletar($id)
    {
        $deleteTask = new Task();
        $taskDelete = $deleteTask->delete($id);
        if ($taskDelete) {
            http_response_code(200);
            echo json_encode(["Linhas Afetadas" => $taskDelete, "message" => "Tarefa Apagada!"]);
        } else {
            echo json_encode(["message" => "Tarefa não encontrada","Linhas Afetadas" => $taskDelete]);
            http_response_code(400);
        }
    }
        public function atualizar($id)
    {
        $json = file_get_contents('php://input');
        $dados = json_decode($json, true);
        $updateTask = new Task();
        $tasksUpdated = $updateTask->update($id, $dados);
        if ($tasksUpdated) {
            http_response_code(201);
            echo json_encode(["message" => "Tarefa atualizada!"]);
        } else {
            http_response_code(400);
        }
    }
}
