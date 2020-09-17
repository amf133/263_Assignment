<!DOCTYPE html>
<html>
<head>
    <title>UC Exam Scheduler</title>
</head>
<body>
<div id="newPage">
    <h2> Upcoming events </h2>
    <form action="NewEvent.php" method="post">
        <div class="container">

            <input type="submit" value="Back" onClick="myFunction()"/>
            <script>
                function myFunction() {
                    window.location.href="index.php";
                }
            </script>
            <br/> <br/>
        </div>

    </form>

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

function validEntries() {

}


function newEvent() {
    global $conn;
    if (validEntries() > 0) {
        //add new event to database
    } else {
        //print error message (maybe include what error)
    }

}
viewEvent($conn);
?>