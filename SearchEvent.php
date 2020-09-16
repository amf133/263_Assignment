<!DOCTYPE html>
<html>
<head>
    <title>UC Exam Scheduler</title>
</head>
<body>
<div id="searchPage">
    <h2> Search Events (definitely not hashing) </h2>
    <form action="SearchEvent.php" method="post">
    </form>

    <?php
    $user = "admin";
    $psswrd = "admin";
    echo $psswrd,  "<br>";
    $secure = hash('gost', $psswrd );
    echo $secure;
    ?>
</div>
