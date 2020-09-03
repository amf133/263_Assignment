<!DOCTYPE html>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h1>Hello</h1>

    <?php
        echo "up2yruf";
        echo "edit";
    ?>
</body>
</html>

<?php
require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
    fatalError($conn->connect_error);
    return;
}
?>