<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->name)
    && isset($data->market)
    && isset($data->flow)
    && isset($data->location)
    && !empty(trim($data->name))
    && !empty(trim($data->market))
    && !empty(trim($data->flow))
    && !empty(trim($data->location))
) {
    $name = mysqli_real_escape_string($db_conn, trim($data->name));
    $market = mysqli_real_escape_string($db_conn, trim($data->market));
    $flow = mysqli_real_escape_string($db_conn, trim($data->flow));
    $location = mysqli_real_escape_string($db_conn, trim($data->location));
    
        $insertUser = mysqli_query($db_conn, "INSERT INTO `users`(`name`,`market`,`flow`,`location`) VALUES('$name','$market','$flow','$location')");
        if ($insertUser) {
            $last_id = mysqli_insert_id($db_conn);
            echo json_encode(["success" => 1, "msg" => "User Inserted.", "id" => $last_id]);
        } else {
            echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
        }
    }