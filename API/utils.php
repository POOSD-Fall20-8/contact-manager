<?php

  //definitions of message status constants
  define("UNREAD",0);
  define("READ",1);
  define("ARCHIVED",2);
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

  function returnWithError($err ){
    $retValue = '{"info":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
  }

  function returnWithInfo( $info ){
    $retValue = '{"info":' . $info   . ',"error":""}';
    sendResultInfoAsJson( $retValue );
  }

  function buildContactJSON( $first_name,$last_name,$email, $phone,$address,$record_id ){
    $contactInfo = '{"first_name":"'. $first_name .'","last_name":"'. $last_name .'",' .
      '"email":"'. $email .'","phone":"'. $phone .'","address":"'. $address .'",'.
      '"record_id":"'. $record_id .'"}';
    return $contactInfo;
  }

  function buildUserJSON($login, $first, $last, $id ){
		$userInfo = '{"login":"'.$login.'","user_id":' . $id . ',"first_name":"' . $first . '","last_name":"' . $last . '"}';
		return $userInfo;
	}

  function buildFriendJSON($user_id,$friend_id){
    $friendInfo = '{"user_id":"'. $user_id .'","friend_id":"'. $friend_id .'"}';
    return $friendInfo;
  }

  function buildMessageJSON($message_id,$sender_id,$recipient_id,$contact_id,$message_text,$status){
    $messageInfo = '{"message_id":"'. $message_id .'","sender_id":"'. $sender_id .'",' .
      '"recipient_id":"'. $recipient_id .'","contact_id":"'. $contact_id .'","message_text":"'. $message_text .'",'.
      '"status":"'. $status .'"}';
    return $messageInfo;
  }

?>
