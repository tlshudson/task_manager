<?php
require_once __DIR__ . '/src/config/Database.php';
require_once __DIR__ . '/src/controllers/TaskController.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Accept");

$method = $_SERVER['REQUEST_METHOD'];

// Handle preflight requests
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$parsedURI = $_SERVER["REQUEST_URI"]; //remoção de "/" da URL

$segments = explode('/', $parsedURI); //primeira limpeza e transformação em arrays
$cleanSegments = array_values(array_filter($segments)); //limpeza dos arrays com valor vazio ""

$route = $cleanSegments[0] ?? null; //definição da rota como 1 segmento do array limpo -> $cleanSegments
$id = $cleanSegments[1] ?? null; 

switch ($route) {
    case 'tasks':
        $controller = new TaskController();
        if ($method === 'GET' && $id === null) {
            $controller->listar();
        } elseif ($method === 'GET' && is_numeric($id)) {
            $controller->listarId($id);
        } elseif ($method === 'DELETE' && is_numeric($id)) {
            $controller->deletar($id);
        } elseif ($method === 'POST' && $id === null) {
            $controller->inserir();
        } elseif ($method === 'PUT' && is_numeric($id)) {
            $controller->atualizar($id);
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
