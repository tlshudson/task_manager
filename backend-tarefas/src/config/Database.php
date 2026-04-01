<?php

class Database
{
    private static $instance = null;


    public static function getConnection()
    {
        if (self::$instance === null) {
            try {
                $envPath = realpath(__DIR__ . '/env.ini');
                $env = parse_ini_file($envPath);

                $conn = "mysql:host={$env['host']};dbname={$env['database']};charset=utf8mb4";

                self::$instance = new PDO($conn, $env['username'], $env['password'], [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
            } catch (PDOException $e) {
                die("Erro de conexão com o banco de dados: " . $e->getMessage());
            }
        }
        return self::$instance;
    }

    public static function query($sql, $params = [])
    {
        $conexao = self::getConnection();
        $stmt = $conexao->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}
