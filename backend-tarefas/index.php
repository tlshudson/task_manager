<?php
require_once __DIR__ . '/src/config/Database.php';
require_once __DIR__ . '/src/controllers/TaskController.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$method = $_SERVER['REQUEST_METHOD'];
$parsedURI = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

$route = trim($uri, '/');

switch ($route) {
    case 'tasks':
        $controller = new TaskController();

        if ($method === 'GET') {
            $controller->listar();
        } elseif ($method === 'POST') {
            $controller->inserir();
        } elseif ($method === 'DELETE') {
            $controller->deletar();
        } elseif ($method === 'PUT') {
            $controller->atualizar();
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método não permitido!"]);
        };
        break;
    default:
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(["error" => "Rota não encontrada", "rota_tentada" => $route]);
        break;
}
