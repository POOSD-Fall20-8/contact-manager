<?php

  /* Shared functions placed here to avoid unnecessary repetition

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

?>
