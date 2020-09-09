var urlBegin = 'http://contactmanageronline.com/API';
var urlEnding = '.php';

function doLogin(){

  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;

  document.getElementById("loginResult").innerHTML = "";

  var loginPayload = '{"login" : "' + user + '", "password" : "' + pass + '"}';
  var url = urlBegin + '/login' + urlEnding;
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
			document.getElementById("createResult").innerHTML = "success logging in, welcome " + jsonObject.first_name;
			return;
		}

    if(error == "No Account Found")
    {
      document.getElementById("createResult").innerHTML = "error: no user found";
      return;
    }

    if(error == "Incorrect Password")
    {
      document.getElementById("createResult").innerHTML = "error: incorrect password";
      return;
    }

	}

  catch(err)
{
  document.getElementById("createResult").innerHTML = err.message;
}

}

function createLogin(){
  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;
  document.getElementById("createResult").innerHTML = "";

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
			document.getElementById("createResult").innerHTML = "success creating account";
			return;
		}

    if(error == "Login Already Used")
    {
      document.getElementById("createResult").innerHTML = "user already exists";
      return;
    }

    if(error == "Login and password required")
    {
      document.getElementById("createResult").innerHTML = "login and password required to create account";
      return;
    }

	}

  catch(err)
{
  document.getElementById("createResult").innerHTML = err.message;
}

}
