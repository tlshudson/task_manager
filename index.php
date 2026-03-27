<?php

require_once 'Database.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$database = new Database();
$pdo = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$endpoint = isset($requestUri[0]) ? $requestUri[0] : '';
$id = isset($requestUri[1]) ? (int)$requestUri[1] : null;

switch ($method) {
    case 'GET':
        if ($endpoint === 'tasks') {
            handleGetTasks($pdo, $id);
        }
        break;
    case 'POST':
        if ($endpoint === 'tasks') {
            handlePostTask($pdo);
        }
        break;
    case 'PUT':
        if ($endpoint === 'tasks' && $id) {
            handlePutTask($pdo, $id);
        }
        break;
    case 'DELETE':
        if ($endpoint === 'tasks' && $id) {
            handleDeleteTask($pdo, $id);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método não permitido']);
        break;
}

function handleGetTasks($pdo, $id) {
    if ($id) {
        $stmt = $pdo->prepare('SELECT * FROM tasks WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $task = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($task) {
            echo json_encode($task);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Tarefa não encontrada']);
        }
    } else {
        $stmt = $pdo->query('SELECT * FROM tasks ORDER BY created_at DESC');
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
    }
}

function handlePostTask($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    $title = $input['title'] ?? null;
    $category = $input['category'] ?? 'outros';

    if (!$title) {
        http_response_code(400);
        echo json_encode(['message' => 'Título da tarefa é obrigatório']);
        return;
    }

    $stmt = $pdo->prepare('INSERT INTO tasks (title, category) VALUES (:title, :category)');
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':category', $category);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['message' => 'Tarefa criada com sucesso', 'id' => $pdo->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao criar tarefa']);
    }
}

function handlePutTask($pdo, $id) {
    $input = json_decode(file_get_contents('php://input'), true);
    $title = $input['title'] ?? null;
    $status = $input['status'] ?? null;

    $updates = [];
    $params = [':id' => $id];

    if ($title !== null) {
        $updates[] = 'title = :title';
        $params[':title'] = $title;
    }
    if ($status !== null) {
        $updates[] = 'status = :status';
        $params[':status'] = $status;
    }

    if (empty($updates)) {
        http_response_code(400);
        echo json_encode(['message' => 'Nenhum campo para atualizar fornecido']);
        return;
    }

    $query = 'UPDATE tasks SET ' . implode(', ', $updates) . ' WHERE id = :id';
    $stmt = $pdo->prepare($query);

    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }

    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Tarefa atualizada com sucesso']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Tarefa não encontrada ou nenhum dado alterado']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao atualizar tarefa']);
    }
}

function handleDeleteTask($pdo, $id) {
    $stmt = $pdo->prepare('DELETE FROM tasks WHERE id = :id');
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Tarefa deletada com sucesso']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Tarefa não encontrada']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao deletar tarefa']);
    }
}

?>