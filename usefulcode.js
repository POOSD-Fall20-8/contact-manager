var urlBegin = 'http://contactmanageronline.com/API';
var urlEnding = '.php';
var userid;

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function addContact(){
  alert("this button does nothing, for now");
}

function doLogin(){

  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;

  document.getElementById("loginResult").innerHTML = "";

  var loginPayload = '{"login" : "' + user + '", "password" : "' + pass + '"}';
  var url = urlBegin + '/login' + urlEnding;

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
			document.getElementById("loginResult").innerHTML = "success logging in, welcome " + jsonObject.first_name;
      window.location.replace("home.html");
      userid = jsonObject.user_id;
      alert("userid: " + userid);
      return false;
		}

    if(error == "No Account Found")
    {
      document.getElementById("loginResult").innerHTML = "error: no user found";
      return false;
    }

    if(error == "Incorrect Password")
    {
      document.getElementById("loginResult").innerHTML = "error: incorrect password";
      return false;
	}

	}

  catch(err)
{
  document.getElementById("loginResult").innerHTML = err.message;
  return false;
}

}

function doLogout(){
  userid = -1;
  window.location.replace("index.html");
  alert("userid: " + userid);
}

function createLogin(){
  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;
  document.getElementById("createResult").innerHTML = "";

  var loginPayload = '{"login" : "' + user + '", "password" : "' + pass + '"}';
  var url = urlBegin + '/register' + urlEnding;

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
			return false;
		}

    if(error == "Login Already Used")
    {
      document.getElementById("createResult").innerHTML = "user already exists";
      return false;
    }

    if(error == "Login and password required")
    {
      document.getElementById("createResult").innerHTML = "login and password required to create account";
      return false;
    }

	}

  catch(err)
{
  document.getElementById("createResult").innerHTML = err.message;
  return false;
}

}
