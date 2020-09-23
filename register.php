<?php

    require_once("config.php");

    //Establish connection to db
    $conn = new mysqli($hostname, $username, $password, $database);

    if ($conn->connect_error)
    {
        fatalError($conn->connect_error);
        return 502; //invalid response from server
    }

    function registerUser($username, $password){

        $sqlQuery = "INSERT INTO user (username, password) VALUES ($username, $password)";
    }
?>
