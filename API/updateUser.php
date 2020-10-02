<?php

	include 'utils.php';

	$inData = getRequestInfo();
	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	 }
	else{
		$user_id = $conn->real_escape_string($inData->user_id);
		$login = $conn->real_escape_string($inData->login);
		$password = $conn->real_escape_string($inData->password);
		$first_name = $conn->real_escape_string($inData->first_name);
		$last_name = $conn->real_escape_string($inData->last_name);

			$sql = "UPDATE users SET ";
			$sql .= "first_name = '" . $first_name ."',";
			$sql .= "last_name = '" . $last_name ."',";
			$sql .= "login = '".$login."',";
			$sql .= "password = '" . $password ."'";
			$sql .= " WHERE user_id = '". $user_id ."'";

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
