<?php
	include 'utils.php';

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$sql = "";
		$result = $conn->query($sql);

		
		$conn->close();
	}

?>
