<!DOCTYPE html>
<html>
<body>
<?php
	$conn = new mysqli("localhost","dbadmin","dbpass","ContactManager");
	if($conn->connect_error){
		echo "error";
	}
	else{
		echo "connected to db";
	}
	$conn->close();
?>
</body>
</html>

