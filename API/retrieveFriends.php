<?php
	include 'utils.php';

	$inData = getRequestInfo();

	$user_id = $inData->user_id;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		//either user in a friend pair can be the user or the friend id,
    $sql = "SELECT friend_id FROM friends WHERE user_id='".$user_id."'";
		$result = $conn->query($sql);
		$friends = '[';
		while($row = $result->fetch_assoc()){
			$friend_id = $row[friend_id];
			$sql = "SELECT login,first_name,last_name FROM users WHERE user_id='".$friend_id."'";
			$friendResult = $conn->query($sql);
			if($friendResult->num_rows > 0){
				$friendRow = $friendResult->fetch_assoc();
				$friends .= buildUserJSON($friendRow[login],$friendRow[first_name],$friendRow[last_name],$friend_id);
				$friends .= ',';
			}
		}
		//get friends who added this user
		$sql = "SELECT user_id FROM friends WHERE friend_id ='".$user_id."'";
		$result = $conn->query($sql);
		while($row = $result->fetch_assoc()){
			$friend_id = $row[user_id];
			$sql = "SELECT login,first_name,last_name FROM users WHERE user_id='".$friend_id."'";
			$friendResult = $conn->query($sql);
			if($friendResult->num_rows > 0){
				$friendRow = $friendResult->fetch_assoc();
				$friends .= buildUserJSON($friendRow[login],$friendRow[first_name],$friendRow[last_name],$friend_id);
				$friends .= ',';
			}
		}
		if($friends == '['){
			returnWithInfo('"friends":[]');
		}
		else{
			$friends = substr_replace($friends,']',-1);
			returnWithInfo('{"friends":'.$friends.'}');
		}
		$conn->close();
	}

?>
