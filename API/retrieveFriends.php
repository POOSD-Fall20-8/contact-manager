<?php
	include 'utils.php';

	$inData = getRequestInfo();

	$user_id = $inData->user_id;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
    $sql = "SELECT friend_id FROM friends WHERE user_id='".$user_id."'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0){
			$friends = '[';
			while($row = $result->fetch_assoc()){
				$sql = "SELECT login,first_name,last_name FROM users WHERE user_id='".$friend_id."'";
				$friendResult = $conn->query($sql);
				if($friendResult->num_rows > 0){
					$friendRow = $friendResult->fetch_assoc();
					$friends .= buildUserJSON($friendRow[login],$friendRow[first_name],$friendRow[last_name],$friend_id);
					$friends .= ',';
				}
			}
			$friends = substr_replace($friends,']',-1);
			returnWithInfo('{"friends":'.$friends.'}');
		}
		else {
			returnWithInfo('"friends":[]');
		}
		$conn->close();
	}

?>
