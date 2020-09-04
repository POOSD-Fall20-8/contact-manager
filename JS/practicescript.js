function doLogin(){
  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;
  alert("username: " + user + " password: " + pass);

  var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = "http://contactmanageronline.com/API/login.php";
  alert("2");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		alert(" "+jsonObject.id);
  }
  catch(err)
	{
		alert("error");
	}
}
