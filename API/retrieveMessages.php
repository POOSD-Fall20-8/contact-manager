<?php
	include 'utils.php';

	$inData = getRequestInfo();

	$recipient_id = $inData->recipient_id;
	$status = $inData->status;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
    $sql = "SELECT message_id,sender_id,contact_id,message_text,status FROM messages WHERE recipient_id='".$recipient_id."'";
		if($status != ""){
			$sql .= " AND status='".$status."'";
		}
		$result = $conn->query($sql);

		if ($result->num_rows > 0){
			$messages = '[';
			while($row = $result->fetch_assoc()){
				$messages .= buildMessageJSON($row[message_id],$row[sender_id],$recipient_id,$row[contact_id],$row[message_text],$row[status]);
				$messages .= ',';
			}
			$messages = substr_replace($messages,']',-1);
			returnWithInfo('{"messages":'.$messages.'}');
		}
		else {
			returnWithInfo('"messages":[]');
		}
		$conn->close();
	}

?>
