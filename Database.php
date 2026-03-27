<?php

class Database {
    private $pdo;

    public function __construct() {
        try {
            $this->pdo = new PDO('mysql:host=127.0.0.1;port=3306;dbname=fabrica_tarefas;charset=utf8mb4', 'root', '');
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->createTasksTable();
        } catch (PDOException $e) {
            die("Erro de conexão com o banco de dados: " . $e->getMessage());
        }
    }

    private function createTasksTable() {
        $query = "
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                status VARCHAR(50) DEFAULT 'pendente',
                category VARCHAR(50) DEFAULT 'outros',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ";
        $this->pdo->exec($query);
    }

    public function getConnection() {
        return $this->pdo;
    }
}

?>