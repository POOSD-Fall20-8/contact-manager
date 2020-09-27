var urlBegin = 'http://firstcontacts.net/API';
var urlEnding = '.php';

function countContact(){
  var addPayload = '{"search" : "", "user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';
  var url = urlBegin + '/searchContact' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		request.send(addPayload);

		var jsonObject = JSON.parse(request.responseText);

    var contacts = jsonObject.info.matched.length;
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

    var contactsArr = jsonObject.info.matched;
  }

  catch(err)
{
  return false;
}

  var table = document.getElementById('myTable');

  tableBody = document.createElement('tbody');

  contactsArr.forEach(function(contactInfo){
    var row = document.createElement('tr');
    Object.entries(contactInfo).forEach(function([key,value]){closeEditContactForm
      if(key!='record_id'){
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(value));
        row.appendChild(cell);
      }
    });

    var id = contactInfo.record_id;

    var editButton = document.createElement('input');
    editButton.setAttribute("value","");
    editButton.setAttribute("type", "image");
    editButton.setAttribute("src","Images/editIcon.png");
    editButton.style.width = "28px";
    editButton.style.height = "28px";
    //editButton.style.borderRadius = "10px";
    editButton.style.margin = "3px";
    editButton.onmouseover = function() {
    this.style.backgroundColor = "cyan";
    }
    editButton.onmouseout = function() {
    this.style.backgroundColor = "";
    }


    editButton.addEventListener("click", function()
    {
      editContact(contactInfo);
    });

    row.appendChild(editButton);


    var deleteButton = document.createElement('input');
    deleteButton.setAttribute("value","");
    deleteButton.setAttribute("type", "image");
    deleteButton.setAttribute("src","Images/deleteIcon.png")
    deleteButton.style.width = "28px";
    deleteButton.style.height = "28px";
  //  deleteButton.style.borderRadius = "10px";
    deleteButton.style.margin = "3px";
    deleteButton.onmouseover = function() {
      this.style.backgroundColor = "tomato";
    }
    deleteButton.onmouseout = function() {
      this.style.backgroundColor = "";
    }

    deleteButton.addEventListener("click", function()
    {

      if (confirm("Are you sure you want to delete contact?") == true)
      {
         deleteContact(id);
      }
      buildTable();
    });

    row.appendChild(deleteButton);


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
  openEditContactForm();

}

function submitEditContactForm() {

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
        return false;
      }

  	}

    catch(err)
  {
    return false;
  }


  }

function deleteContact(record_id){
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
      return false;
    }

    if(error == "")
    {
      return false;
    }
  }

  catch(err)
  {
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
      window.sessionStorage.setItem("user_id",jsonObject.info.user_id);
      window.location.href = "home.html";
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
}

function createLogin(){
  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;

  var hashedpass = md5( pass );
  document.getElementById("createResult").innerHTML = "";

  var loginPayload = '{"login" : "' + user + '", "password" : "' + hashedpass +
  '" ,"first_name" : "'+firstName+'", "last_name" : "'+lastName+'"}';
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
      document.getElementById("createResult").style.color = "red";
      return false;
    }

    if(error == "Login and password required")
    {
      document.getElementById("createResult").innerHTML = "login and password required to create account";
      document.getElementById("createResult").style.color = "red";
      return false;
    }

    if(error == "")
    {
      document.getElementById("createResult").innerHTML = "success creating account";
      document.getElementById("createResult").style.color = "green";
      setTimeout(function(){location.href="index.html"} , 1500);
      return false;
    }

	}

  catch(err)
{
  document.getElementById("createResult").innerHTML = err.message;
  return false;
}

}

function openAddContactForm() {
  document.getElementById("addContactForm").style.display = "block";
}

function openEditContactForm() {
  document.getElementById("editContactForm").style.display = "block";
}

function closeAddContactForm() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("pnum").value = "";
  document.getElementById("addy").value = "";
  document.getElementById("addContactForm").style.display = "none";
}

function closeEditContactForm() {
  document.getElementById("editContactForm").style.display = "none";
}

function submitAddContactForm() {
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
    contactid = jsonObject.info.record_id;

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
}

function updateAccount(){
  // need to fill in existing first and last name on new page 
  location.href = "updateAccount.html";
}

function submitAccountUpdate(){
  //WIP
    var userid = window.sessionStorage.getItem("user_id");
    var first_name = document.getElementById("firstName").value;
    var last_name = document.getElementById("lastName").value;
    var password = document.getElementById("newPassword").value;
    var hashedpass = md5(password);

    var payload = '{"first_name" : "' + first_name + '", "last_name" : "' + last_name +
     '", "password" : "' + hashedpass + '", "user_id" : "' + user_id+  '"}';
    var url = urlBegin + '/updateAccount' + urlEnding;

    var request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
  	{
  		request.send(contactPayload);

  		var jsonObject = JSON.parse(request.responseText);

      error = jsonObject.error;

      if(error == "")
      {
        return false;
      }
      else{
        //?
        return false;
      }
    }

    catch(err)
  {
    // ?
    return false;
  }
}
