<?php
	include 'utils.php';

	function returnWithError( $err ){
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $id ){
		$retValue = '{"record_id":"' . $id   . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

	$inData = getRequestInfo();

	$address = $inData->address;
	$email = $inData->email;
	$first_name = $inData->first_name;
	$last_name = $inData->last_name;
	$phone = $inData->phone;
	$user_id = $inData->user_id;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$sql = "INSERT INTO contacts (address,email,first_name,last_name,phone,user_id,date_added)".
						" VALUES '". $address . "','". $email . "', '". $first_name ."','" . $last_name ."','".
						$phone ."','". $user_id . "', NOW())";
		$result = $conn->query($sql);
		if(result == TRUE){
			returnWithInfo($conn->insert_id);
		}
		else{
			returnWithError($conn->error);
		}
		$conn->close();
	}

?>
