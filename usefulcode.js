var urlBegin = 'http://contactmanageronline.com/API';
var urlEnding = '.php';

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



function countContact(){
  var addPayload = '{"search" : "", "user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';
  var url = urlBegin + '/searchContact' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
    //alert(addPayload);
		request.send(addPayload);

		var jsonObject = JSON.parse(request.responseText);

    var contacts = jsonObject.matched.length;
    //alert("User: " + window.sessionStorage.getItem("user_id") + "Number of contacts: " + contacts);
    alert("Number of contacts: " + contacts);

	}

  catch(err)
{
  alert(err.message);
  return false;
}

}


function buildTable() {
  search = document.getElementById("searchBar").value;
  //last_name = document.getElementById("searchBar2").value;
  //email_address = document.getElementById("searchBar3").value;
  //phone_number = document.getElementById("searchBar4").value;
  //home_address = document.getElementById("searchBar5").value;

  //did not substitute 'search' for first_name yet
  var searchPayload = '{"search" : "' + search + '", "user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';
  //var searchPayload = '{"search" : "' + search + '", "last_name" : "' + last_name + '", "email_address" : "' + email_address + '", "phone_number" : "' + phone_number + '", "home_address" : "' + home_address + '", "user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';

  var url = urlBegin + '/searchContact' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    request.send(searchPayload);

    var jsonObject = JSON.parse(request.responseText);

    var contactsArr = jsonObject.matched;

  }

  catch(err)
{
  alert(err.message);
  return false;
}

  var table = document.getElementById('myTable');

  tableBody = document.createElement('tbody');

  contactsArr.forEach(function(contactInfo){
    var row = document.createElement('tr');
    Object.entries(contactInfo).forEach(function([key,value]){
      if(key!='record_id'){
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(value));
        row.appendChild(cell);
      }
    });

    var id = contactInfo.record_id;

    var button = document.createElement('button');
    button.innerHTML = "Edit";

    button.addEventListener("click", function()
    {
      editContact(contactInfo)
    });

    row.appendChild(button);


    var button = document.createElement('button');
    button.innerHTML = "Delete";

    button.addEventListener("click", function()
    {
      var userPreference;

      if (confirm("Do you want to delete contact?") == true) 
      {
         deleteContact(id);
      } 
      else 
      {
        userPreference = "Alright!";
      }
      buildTable();
    });

    row.appendChild(button);



    tableBody.appendChild(row);
  });

  if (table.childNodes.length > 2){
      table.replaceChild(tableBody,table.childNodes[table.childNodes.length-1]);
  }
  else{
    table.appendChild(tableBody);
  }

  return false;
}

function editContact(contactInfo) {
  document.getElementById("fname2").value = contactInfo.first_name;
  document.getElementById("lname2").value = contactInfo.last_name;
  document.getElementById("email2").value = contactInfo.email;
  document.getElementById("pnum2").value = contactInfo.phone;
  document.getElementById("addy2").value = contactInfo.address;
  document.getElementById("recordid").value = contactInfo.record_id;
  openForm2();

}

function updateForm() {

    var recordid = document.getElementById("recordid").value;
    var firsty = document.getElementById("fname2").value;
    var lasty = document.getElementById("lname2").value;
    var emmy = document.getElementById("email2").value;
    var phony = document.getElementById("pnum2").value;
    var addy = document.getElementById("addy2").value;
    var userid = window.sessionStorage.getItem("user_id");

    var updatePayload = '{"record_id" : "' + recordid + '", "first_name" : "' + firsty + '", "last_name" : "' + lasty + '", "email" : "' + emmy + '", "phone" : "' + phony + '", "address" : "' + addy + '", "user_id" : ' + userid +  '}'
    var url = urlBegin + '/updateContact' + urlEnding;

    var request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
  	{
  		request.send(updatePayload);

  		var jsonObject = JSON.parse(request.responseText);

      error = jsonObject.error;

      if(error == "")
      {
        alert("contact successfully updated");
        return false;
      }

  	}

    catch(err)
  {
    alert(err.message);
    return false;
  }


  }




function deleteContact(record_id){

  alert("Delete:" + record_id);
  var deletePayload = '{"record_id" : "' + record_id + '", "user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';
  var url = urlBegin + '/deleteContact' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    request.send(deletePayload);

    var jsonObject = JSON.parse(request.responseText);

    error = jsonObject.error;

    if(error == "Record Not Found")
    {
      //document.getElementById("loginResult").innerHTML = "error: no user found";
      //alert("liar");
      return false;
    }

    if(error == "")
    {
      alert("contact successfully deleted")
      //alert("userid: " + window.sessionStorage.getItem("user_id"));
      return false;
    }
  }

  catch(err)
  {
  alert(err.message);
  return false;
  }

}

function doLogin(){

  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;

  var hashedpass = md5(pass);

  document.getElementById("loginResult").innerHTML = "";

  var loginPayload = '{"login" : "' + user + '", "password" : "' + hashedpass + '"}';
  var url = urlBegin + '/login' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		request.send(loginPayload);

		var jsonObject = JSON.parse(request.responseText);

    error = jsonObject.error;

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

    if(error == "")
    {
      window.sessionStorage.setItem("user_id",jsonObject.user_id);
      window.location.href = "home.html";
      //alert("userid: " + window.sessionStorage.getItem("user_id"));
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
  window.sessionStorage.setItem("user_id","-1");
  window.location.replace("index.html");
  //alert("userid: " + window.sessionStorage.getItem("user_id"));
}

function createLogin(){
  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;

  var hashedpass = md5( pass );
  document.getElementById("createResult").innerHTML = "";

  var loginPayload = '{"login" : "' + user + '", "password" : "' + hashedpass + '"}';
  var url = urlBegin + '/register' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		request.send(loginPayload);

		var jsonObject = JSON.parse(request.responseText);

		error = jsonObject.error;

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

    if(error == "")
    {
      document.getElementById("createResult").innerHTML = "success creating account";
      return false;
    }

	}

  catch(err)
{
  document.getElementById("createResult").innerHTML = err.message;
  return false;
}

}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function openForm2() {
  document.getElementById("myForm2").style.display = "block";
}

function closeForm() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("pnum").value = "";
  document.getElementById("addy").value = "";
  document.getElementById("myForm").style.display = "none";
}

function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}

function submitForm() {
  var firsty = document.getElementById("fname").value;
  var lasty = document.getElementById("lname").value;
  var emmy = document.getElementById("email").value;
  var phony = document.getElementById("pnum").value;
  var addy = document.getElementById("addy").value;
  var userid = window.sessionStorage.getItem("user_id");





  var contactPayload = '{"first_name" : "' + firsty + '", "last_name" : "' + lasty + '", "email" : "' + emmy + '", "phone" : "' + phony + '", "address" : "' + addy + '", "user_id" : "' + userid +  '"}'
  var url = urlBegin + '/addContact' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		request.send(contactPayload);

		var jsonObject = JSON.parse(request.responseText);

    error = jsonObject.error;
    contactid = jsonObject.record_id;

    if(error == "")
    {
      document.getElementById("contactPrompt").innerHTML = "success adding, contact: " + contactid;
      return false;
    }


	}

  catch(err)
{
  document.getElementById("contactPrompt").innerHTML = err.message;
  return false;
}

  //alert(contactPayload);
}