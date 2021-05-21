<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id)
    && isset($data->name)
    && isset($data->market)
    && isset($data->flow)
    && isset($data->location)
    && is_numeric($data->id)
    && !empty(trim($data->name))
    && !empty(trim($data->market))
    && !empty(trim($data->flow))
    && !empty(trim($data->location))
) {
    $name = mysqli_real_escape_string($db_conn, trim($data->name));
    $market = mysqli_real_escape_string($db_conn, trim($data->market));
    $flow = mysqli_real_escape_string($db_conn, trim($data->flow));
    $location = mysqli_real_escape_string($db_conn, trim($data->location));

        $updateUser = mysqli_query($db_conn, "UPDATE `users` SET `name`='$name', `market`='$market', `flow`='$flow', `location`='$location' WHERE `id`='$data->id'");

        if ($updateUser) {
            echo json_encode(["success" => 1, "msg" => "User Updated."]);
        } else {
            echo json_encode(["success" => 0, "msg" => "User Not Updated!" + "Please fill all the required fields!"]);
        }
}