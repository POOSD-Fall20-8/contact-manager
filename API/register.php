<?php

	include 'utils.php';

	function returnWithError( $err ){
		$retValue = '{"login":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $login ){
		$retValue = '{"login":' . $login . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}

	$inData = getRequestInfo();

	$login = $inData->login;
	$password = $inData->password;
	$first_name = $inData->first_name;
	$last_name = $inData->last_name;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
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
			if( $result != TRUE ){
				returnWithError( $conn->error );
			}
			else {
				returnWithInfo($login);
			}
    }
		$conn->close();
	}
?>
