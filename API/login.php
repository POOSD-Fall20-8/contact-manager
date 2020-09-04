<?php
	function getRequestInfo(){
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj ){
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err ){
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $id ){
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}

	$sql = "SELECT user_id,first_name,last_name FROM users where login='" . $inData["login"] . "' and password='" . $inData["password"] . "'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0){
		$row = $result->fetch_assoc();
		returnWithInfo($row["first_name"], $row["last_name", $row["user_id"] );
	}
	else{
		returnWithError( "No Records Found" );
	}

	$conn->close();
?>
