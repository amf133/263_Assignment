<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css">
    <link rel="stylesheet" href="styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>UC Exam Scheduler</title>
</head>
<body>
<form method="post">
    <div id="loginPage" class = "container">
        <div class = "row mt-3">
            <div class = "col text-center">
                <h2> Please login </h2>
            </div>
        </div>
        <div class = "row align-items-center mt-3">
            <div class = "col text-center">
                <input type="text" placeholder="Enter Username" name="user_name" required>
            </div>
        </div>
        <div class = "row mt-3">
            <div class = "col text-center">
                <input type="password" placeholder="Enter Password" name="user_password" required>
            </div>
        </div>
        <div class = "row mt-3">
            <div class = "col text-center">
                <button>Login</button>
            </div>
        </div>
    </div>

</form>

    <div id="mainPage" class = "container">
        <div class = "row mt-3">
            <div class = "col text-center">
                <h2>Your dashboard</h2>
            </div>
        </div>
        <div class = "row mt-3">
            <div class = "col-4 text-center">
                <h3>Welcome back {name}</h3> <!-- need to change name to cookie name or whatever -->
            </div>
            <div class = "col-4 text-center">
                <button/>Create new event</button>
            </div>
            <div class = "col-4 text-center">
                <button onClick="window.location.href='ViewEvents.html'"/>View events</button>
            </div>
        </div>
        <div class = "row mt-3">
            <div class = "col text-center">
                <textarea style="min-width: 60%" placeholder="Search for new event" rows="1"></textarea>
            </div>
        </div>
    </div>

</body>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
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