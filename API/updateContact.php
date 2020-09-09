<?php
	include 'utils.php';

	function returnWithError($id, $err ){
		$retValue = '{"record_id":"'. $id .'","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $id ){
		$retValue = '{"record_id":"' . $id   . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

	$inData = getRequestInfo();



	$first_name = $inData->first_name;
	$last_name = $inData->last_name;
	$email = $inData->email;
	$phone = $inData->phone;
	$address = $inData->address;
	$user_id = $inData->user_id;
	$record_id = $inData->record_id;

	$sql = "UPDATE contacts SET ";

	if ($first_name != ""){
		$sql .= "first_name = '" . $first_name ."',";
	}
	if ($last_name != ""){
		$sql .= "last_name = '" . $last_name ."',";
	}
	if ($email != ""){
		$sql .= "email = '" . $email ."',";
	}
	if ($phone != ""){
		$sql .= "phone = '" . $phone ."',";
	}
	if ($address != ""){
		$sql .= "address = '".$address."',";
	}

	if (substr($sql,-1) == ","){
		$sql = substr_replace($sql," ",-1);
	}
	else{
		returnWithError("No Fields To Update");
	}

	$sql .= "WHERE user_id = '". $user_id ."' AND record_id = '". $record_id . "'";

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$result = $conn->query($sql);
		if ($conn->affected_rows > 0){
			returnWithInfo($record_id);
		}
		else {
			returnWithError("Could Not Match Record");
		}
		$conn->close();
	}

?>
