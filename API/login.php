<?php

    $inData = getRequestInfo();
    $conn = new mysqli("localhost","dbadmin","dbpass","ContactManager");
    if($conn->connect_error){
      returnWithError($conn->connect_error);
    }
    $login = $inData[login];
    $pass = $inData[password];

		$sql = "SELECT user_id,first_name,last_name FROM users where login='" . $login. "' and password='" . $pass . "'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        $row = $result->fetch_assoc();
        returnWithInfo($row["first_name"],$row["last_name"],$row["user_id"])
    }
    $conn->close();

		function getRequestInfo()
		{
			return json_decode(file_get_contents('php://input'), true);
		}

		function sendResultInfoAsJson( $obj )
		{
			header('Content-type: application/json');
			echo $obj;
		}

		function returnWithError( $err )
		{
			$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
			sendResultInfoAsJson( $retValue );
		}

		function returnWithInfo( $firstName, $lastName, $id ){
			$retValue = '{"id":' . $id . ',"first":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
			sendResultInfoAsJson( $retValue );
		}
?>
