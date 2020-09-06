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
		$sql = "SELECT user_id FROM users where login='" . $login . "';
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        if($login == $row[user_id]){
            echo "Username already exists";
        }
        else
            $sql = "INSERT INTO ContactManager (username, password) VALUES ($login, $password)";
        
	}
	$conn->close();

?>