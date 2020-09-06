<?php
	include 'utils.php';

	function returnWithError( $err ){
		$retValue = '{"user_id":0,"first_name":"","last_name":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $first, $last, $id ){
		$retValue = '{"user_id":' . $id . ',"first_name":"' . $first . '","last_name":"' . $last . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

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
				returnWithInfo($row[first_name], $row[last_name], $row[user_id] );
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
