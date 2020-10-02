<?php

	include 'utils.php';

	$inData = getRequestInfo();
	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$login = $conn->real_escape_string($inData->login);
		$password = $conn->real_escape_string($inData->password);
		$first_name = $conn->real_escape_string($inData->first_name);
		$last_name = $conn->real_escape_string($inData->last_name);

		if (($login == "") || ($password == "")){
			returnWithError("Login and password required");
		}
		else{
			$sql = "SELECT user_id FROM users where login='" . $login . "'";
	    $result = $conn->query($sql);
	    if($result->num_rows > 0){
	    	returnWithError("Login Already Used");
	    }
	    else{
			$sql = "INSERT INTO users (login,password,first_name,last_name) VALUES ('" . $login . "','" . $password . "','" . $first_name . "','" . $last_name . "')";
				$result = $conn->query($sql);
				if( $result == TRUE ){
					returnWithInfo(buildUserJSON($login,$first_name,$last_name,$conn->insert_id));
				}
				else {
					returnWithError( $conn->error);
				}

	    }
			$conn->close();
		}
	}
?>
