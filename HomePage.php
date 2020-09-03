<!DOCTYPE html>
<html>
<head>
    <title>UC Exam Scheduler</title>
</head>
<body>
    <div id="loginPage">
        <h2> Please login </h2>
        <form action="HomePage.php" method="post">
            <div class="container">
                <label for="username"><b>Username</b></label>
                <br/>
                <input type="text" placeholder="Enter Username" name="user_name" required>
                <br/> <br/>
                <label for="psw"><b>Password</b></label>
                <br/>
                <input type="password" placeholder="Enter Password" name="user_password" required>
                <br/> <br/>

                <button type="submit">Login</button>
            </div>

        </form>

    </div>


    <div id="mainPage">

    </div>

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