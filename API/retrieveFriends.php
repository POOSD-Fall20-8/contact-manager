<?php
	include 'utils.php';

	$inData = getRequestInfo();

  //inData->whatever

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
    // $sql = whatever
		$result = $conn->query($sql);
		// conditions, return info or return error
		$conn->close();
	}

?>
