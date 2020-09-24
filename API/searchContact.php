<?php
	include 'utils.php';


	function returnWithError( $err ){
		$retValue = '{"matched":[],"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function buildJSON( $first_name,$last_name,$email, $phone,$address,$record_id ){
		$retValue = '{"first_name":"'. $first_name .'","last_name":"'. $last_name .'",' .
			'"email":"'. $email .'","phone":"'. $phone .'","address":"'. $address .'",'.
			'"record_id":"'. $record_id .'"}';
		return $retValue;
	}

	function returnWithInfo($matched){
		$retValue = '{"matched":'. $matched .',"error":""}';
		sendResultInfoAsJson( $retValue );
	}

	$inData = getRequestInfo();

	$search = $inData->search;
	$first_name = $inData->first_name;
	$last_name = $inData->last_name;
	$email = $inData->email;
	$phone = $inData->phone;
	$address = $inData->address;
	$user_id = $inData->user_id;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		/*
		if($search != ""){
			$sql = "SELECT first_name,last_name,email,phone,address,record_id FROM contacts WHERE ".
			"(first_name LIKE '%". $search."%' OR last_name LIKE '%". $search."%' OR " .
			"email LIKE '%". $search."%' OR phone LIKE '%". $search."%' OR address LIKE '%". $search."%')".
			" AND user_id='".$user_id."'";
		}
		else{
			$sql = "SELECT first_name,last_name,email,phone,address,record_id FROM contacts WHERE ".
			"(first_name LIKE '%". $first_name."%' AND last_name LIKE '%". $last_name."%' AND " .
			"email LIKE '%". $email."%' AND phone LIKE '%". $phone."%' AND address LIKE '%". $address."%')".
			" AND user_id='".$user_id."'";
		}*/

		$sql = "SELECT first_name,last_name,email,phone,address,record_id FROM contacts WHERE ".
		"(CONCAT_WS(" ",first_name,last_name) LIKE '%". $search . "%' OR " .
		"email LIKE '%". $search."%' OR phone LIKE '%". $search."%' OR address LIKE '%". $search."%')".
		" AND user_id='".$user_id."'";

		$result = $conn->query($sql);
		if ($result->num_rows > 0){
			$matched = '[';
			while($row = $result->fetch_assoc()){
				$matched .= buildJson($row[first_name],$row[last_name],$row[email],$row[phone],$row[address],$row[record_id]);
				$matched .= ',';
			}
			$matched = substr_replace($matched,']',-1);
			returnWithInfo($matched);
		}
		else {
			returnWithError("No Records Found");
		}

		$conn->close();
	}

?>
