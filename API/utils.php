<?php

  /*
  Shared functions placed here to avoid unnecessary repetition
  */
  function getRequestInfo(){
    return json_decode(file_get_contents('php://input'));
  }

  function sendResultInfoAsJson( $obj ){
    header('Content-type: application/json');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: *');
	header('Access-Control-Allow-Methods: *');
	echo $obj;
  }

  function buildContactJSON( $first_name,$last_name,$email, $phone,$address,$record_id ){
    $contactInfo = '{"first_name":"'. $first_name .'","last_name":"'. $last_name .'",' .
      '"email":"'. $email .'","phone":"'. $phone .'","address":"'. $address .'",'.
      '"record_id":"'. $record_id .'"}';
    return $contactInfo;
  }

  function buildUserJSON($login, $first, $last, $id ){
		$userInfo = '{"login:":"'.$login.'","user_id":' . $id . ',"first_name":"' . $first . '","last_name":"' . $last . '"}';
		return $userInfo;
	}

  function returnWithError($err ){
    $retValue = '{"info":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
  }

  function returnWithInfo( $info ){
    $retValue = '{"info":"' . $info   . '","error":""}';
    sendResultInfoAsJson( $retValue );
  }

?>
