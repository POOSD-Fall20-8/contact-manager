<!DOCTYPE html>
<html>
<body>
<?php
    $conn = new mysqli("localhost","dbadmin","dbpass","ContactManager");
    if($conn->connect_error){
        echo "error connecting to database\n";
    }
    $login = RickL;
    $pass = COP4331;

    $sql = "SELECT user_id,first_name,last_name FROM users where login='" . $login. "' and password='" . $pass . "'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        $row = $result->fetch_assoc();
        echo "Name: " . $row[first_name] . " " . $row[last_name];
    }
    $conn->close();
?>
</body>
</html>
