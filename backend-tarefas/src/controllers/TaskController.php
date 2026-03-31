<?php
class TaskController{
    public function listar(){
        echo json_encode([
            "mensagem" => "Listando tarefas do banco..."
        ]);
    }
}