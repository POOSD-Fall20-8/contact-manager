<?php
	include 'utils.php';

	$inData = getRequestInfo();

	$login = $inData->login;
	$password = $inData->password;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
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
