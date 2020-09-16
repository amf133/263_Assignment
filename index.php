<!DOCTYPE html>
<html>
<head>
    <title>UC Exam Scheduler</title>
</head>
<body>
    <div id="loginPage">
        <h2> Please login </h2>
        <form action="index.php" method="post">
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
        <h2> Home Page </h2>
        <input type="submit" value="View Events" onClick="myFunction()"/>
        <script>
            function myFunction() {
                window.location.href="ViewEvent.php";
            }
        </script>
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

function checkUser($conn, $name, $password) {
    /* Checks if user is is database and issues a cookie if they are */
    //-------------------need to hash password here and change the stored data in sql to a hash
    //-------------------can make this more efficient
    $result = mysqli_query($conn, "SELECT * FROM user");

    $password = hash('gost', $password );
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($row['username'] == $name && $row['password'] == $password) {
            setcookie("username", $name);
            header("Refresh:0"); //reload page
            return;
        }
    }
    echo "No user in database";
}

if (isset($_COOKIE['username'])) {
    //hide login page
    ?>
    <style>
        #loginPage{display:none;}
    </style>
    <?php
} else {
    //hide main page
    ?>
    <style>
        #mainPage{display:none;}
    </style>
    <?php
    //if username and password fields have been entered: check if user is in database
    if(isset($_POST["user_name"]) && isset($_POST["user_password"])) {
        $user_name = $_POST["user_name"];
        $user_password = $_POST["user_password"];
        checkUser($conn, $user_name, $user_password);
    }
}
?>