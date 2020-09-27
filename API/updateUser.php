<?php

	include 'utils.php';

	$inData = getRequestInfo();

	$user_id = $inData->user_id;
	$password = $inData->password;
	$first_name = $inData->first_name;
	$last_name = $inData->last_name;

    $conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
    }
    else{
		$sql = "UPDATE users SET ";
		$sql .= "first_name = '" . $first_name ."',";
		$sql .= "last_name = '" . $last_name ."',";
		$sql .= "password = '" . $password ."',";
		$sql .= "WHERE user_id = '". $user_id ."'";
		
		$result = $conn->query($sql);
		if ($conn->affected_rows > 0){
			returnWithInfo(buildUserJSON($login,$first_name,$last_name,$user_id));
		}
		else {
			returnWithError("Could Not Match Record");
		}
        $conn->close();
	}



?>
