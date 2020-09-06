<?php
	function getRequestInfo(){
		return json_decode(file_get_contents('php://input'));
	}

	function sendResultInfoAsJson( $obj ){
		header('Content-type: application/json');
		echo $obj;
	}

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
		$sql = "SELECT user_id,first_name,last_name,password FROM users where login='" . $login . "' and password='" . $password . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0){
			$row = $result->fetch_assoc();
			returnWithInfo($row[first_name], $row[last_name], $row[user_id] );
		}
		else{
			$sql = "SELECT user_id from users where login='" . $login "'";
			if ($result->num_rows > 0){
				returnWithError("Incorrect Password");
			}
			else{
				returnWithError("No Account Found");
			}
		}
	}
	$conn->close();

?>
