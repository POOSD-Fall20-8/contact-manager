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
		
		$sql = "SELECT user_id,first_name,last_name,password FROM users WHERE login='" . $login . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0){
			$row = $result->fetch_assoc();
			if ($row[password] == $password){
				returnWithInfo(buildUserJSON($login, $row[first_name], $row[last_name], $row[user_id] ));
			}
			else {
				returnWithError("Incorrect Password");
			}
		}
		else{
				returnWithError("No Account Found");
		}
		$conn->close();
	}

?>
