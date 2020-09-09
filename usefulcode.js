var urlBegin = 'http://contactmanageronline.com/API';
var urlEnding = '.php';

function doLogin(){
  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;
  alert("username: " + user + " password: " + pass);
}

function createLogin(){
  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;

  var loginPayload = '{"login" : "' + user + '", "password" : "' + pass + '"}';
  var url = urlBegin + '/register' + urlEnding;
  alert(loginPayload);

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		request.send(loginPayload);

		var jsonObject = JSON.parse(request.responseText);

		error = jsonObject.error;

		if(error == "")
		{
			document.getElementById("loginResult").innerHTML = "success creating account";
			return;
		}

    if(error == "Login Already Used")
    {
      document.getElementById("loginResult").innerHTML = "user already exists";
      return;
    }

    if(error == "Login and password required")
    {
      document.getElementById("loginResult").innerHTML = "login and password required to create account";
      return;
    }

    alert(document.getElementById("loginResult").innerHTML);
	}

  catch(err)
{
  document.getElementById("loginResult").innerHTML = err.message;
}

}
