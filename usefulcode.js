var urlBegin = 'http://firstcontacts.net/API';
var urlEnding = '.php';

// Functions for create.html

function createLogin() {

  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var hashedpass = md5( pass );

  document.getElementById("createResult").innerHTML = "";

  var loginPayload = '{"login" : "' + user + '", "password" : "' + hashedpass +
  '" ,"first_name" : "' + firstName +'", "last_name" : "'+ lastName + '"}';
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

// Functions for index.html

function doLogin() {

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
      window.sessionStorage.setItem("first_name",jsonObject.info.first_name);
      window.sessionStorage.setItem("last_name",jsonObject.info.last_name);
      window.sessionStorage.setItem("login",jsonObject.info.login);
      window.location.href = "home.html";
      buildFriendsTable();
      return false;
    }

	}

  catch(err)
  {
    document.getElementById("loginResult").innerHTML = err.message;
    return false;
  }
}

// Functions for home.html

function doLogout() {
  window.sessionStorage.setItem("user_id","-1");
  window.location.replace("index.html");
}

function submitAddContactForm() {
  var firsty = document.getElementById("fname").value;
  var lasty = document.getElementById("lname").value;
  var emmy = document.getElementById("email").value;
  var phony = document.getElementById("pnum").value;
  var addy = document.getElementById("addy").value;
  var userid = window.sessionStorage.getItem("user_id");

  closeAddContactForm();
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
      return false;
    }

	}

  catch(err)
  {
    return false;
  }

}

function openAddContactForm() {
  document.getElementById("addContactForm").style.display = "block";
}

function closeAddContactForm() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("pnum").value = "";
  document.getElementById("addy").value = "";
  document.getElementById("addContactForm").style.display = "none";
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

function openEditContactForm() {
  document.getElementById("editContactForm").style.display = "block";
}

function closeEditContactForm() {
  document.getElementById("editContactForm").style.display = "none";
}

function deleteContact(record_id) {
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

function buildTable() {
  search = document.getElementById("searchBar").value;
  var searchPayload = '{"search" : "' + search + '", "user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';

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
  if(contactsArr){
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
  }

  if (table.childNodes.length > 2){
      table.replaceChild(tableBody,table.childNodes[table.childNodes.length-1]);
  }
  else{
    table.appendChild(tableBody);
  }

  return false;
}

// Functions for updateAccount.html

function updateAccount() {
  window.location.href = "updateAccount.html";
}

function populateAccountFields(){
  var oldLogin = window.sessionStorage.getItem("login");
  document.getElementById("login").placeholder = oldLogin;
  var oldFirst = window.sessionStorage.getItem("first_name");
  if(oldFirst){
    document.getElementById("firstName").placeholder = oldFirst;
  }
  var oldLast = window.sessionStorage.getItem("last_name");
  if(oldLast){
    document.getElementById("lastName").placeholder = oldLast;
  }
}

function submitAccountUpdate() {
  //WIP
    var user_id = window.sessionStorage.getItem("user_id");
    var first_name = document.getElementById("firstName").value;
    var last_name = document.getElementById("lastName").value;
    var login = document.getElementById("login").value;
    var password = document.getElementById("newPassword").value;
    var password2 = document.getElementById("newPassword2").value;
    var oldPass = document.getElementById("loginPassword").value;
    var hashOldPass = md5(oldPass);

    if(!verifyLogin(window.sessionStorage.getItem("login"),hashOldPass)){
      document.getElementById("updateResult").innerHTML = "Current password incorrect";
      return false;
    }
    if(first_name == ""){
      first_name = window.sessionStorage.getItem("first_name");
    }
    if(last_name == ""){
      last_name = window.sessionStorage.getItem("last_name");
    }
    if(login == ""){
      login = window.sessionStorage.getItem("login");
    }

    if ((password != password2)){
      document.getElementById("updateResult").innerHTML = "Passwords must match";
      return false;
    }
    if(password == ""){
      var hashedpass = hashOldPass;
    }
    else{
      var hashedpass = md5(password);
    }
    var payload = '{"login" : "'+login+'","first_name" : "' + first_name + '", "last_name" : "' + last_name +
     '", "password" : "' + hashedpass + '", "user_id" : "' + user_id+  '"}';
    var url = urlBegin + '/updateUser' + urlEnding;

    var request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{
  		request.send(payload);
  		var jsonObject = JSON.parse(request.responseText);
      error = jsonObject.error;

      if(error == ""){
        window.location.href = "home.html";
        return false;
      }
      else{
        document.getElementById("updateResult").innerHTML = error;
        return false;
      }
    }
    catch(err){
    document.getElementById("updateResult").innerHTML = err;
    return false;
  }
}

function verifyLogin(user,hashedpass){
  var loginPayload = '{"login" : "' + user + '", "password" : "' + hashedpass + '"}';
  var url = urlBegin + '/login' + urlEnding;
  var request = new XMLHttpRequest();

  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
		request.send(loginPayload);
		var jsonObject = JSON.parse(request.responseText);
    error = jsonObject.error;
    if(error == ""){
      return true;
    }
    else {
      return false;
    }
	}
  catch(err){
    return false;
  }
}

/*
function toggleFriendsList() {
  friendPanel = document.getElementById("friendPanel");
  if (friendPanel.style.display == "none" || friendPanel.style.display == ""){
    buildFriendsTable();
    friendPanel.style.display = "block";
    friendPanel.style.width = "12%";
  }
  else{
    friendPanel.style.width = 0;
    friendPanel.style.display = "none";
  }
}
*/

function buildFriendsTable(){

  var payload = '{"user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';
  var url = urlBegin + '/retrieveFriends' + urlEnding;
  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    request.send(payload);
    var jsonObject = JSON.parse(request.responseText);
    var friendsArr = jsonObject.info.friends;
  }

  catch(err)
{
  return false;
}

  var table = document.getElementById('friendTable');

  tableBody = document.createElement('tbody');
  if (friendsArr.length == 0){
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode("You don't have any friends yet :("));
    row.appendChild(cell);
    tableBody.appendChild(row);
    table.appendChild(tableBody);
    return false;
  }
  friendsArr.forEach(function(friendInfo){
    var row = document.createElement('tr');
    Object.entries(friendInfo).forEach(function([key,value]){
      if(key == "login"){
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(value));
        row.appendChild(cell);
      }
    });
    var messageButton = document.createElement('input');
    messageButton.setAttribute("value","");
    messageButton.setAttribute("type", "image");
    messageButton.setAttribute("src","Images/messageIcon.png");
    messageButton.style.width = "18px";
    messageButton.style.height = "18px";
    messageButton.onmouseover = function() {
      this.style.backgroundColor = "lime";
    }
    messageButton.onmouseout = function() {
      this.style.backgroundColor = "";
    }

    messageButton.addEventListener("click", function()
    {
      openMessageForm(friendInfo);
    });
    row.appendChild(messageButton);

    var deleteButton = document.createElement('input');
    deleteButton.setAttribute("value","");
    deleteButton.setAttribute("type", "image");
    deleteButton.setAttribute("src","Images/deleteIcon.png")
    deleteButton.style.width = "18px";
    deleteButton.style.height = "18px";
    deleteButton.onmouseover = function() {
      this.style.backgroundColor = "tomato";
    }
    deleteButton.onmouseout = function() {
      this.style.backgroundColor = "";
    }
    deleteButton.addEventListener("click", function(){
      if (confirm("Are you sure you want to delete friend?") == true){
         deleteFriend(friendInfo.user_id);
      }
      buildFriendsTable();
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

function deleteFriend(friend_id){
  var payload = '{"user_id" : "' + window.sessionStorage.getItem("user_id") + '", "friend_id" : "'
  + friend_id + '"}';
  var url = urlBegin + '/deleteFriend' + urlEnding;
  var request = new XMLHttpRequest();

  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    request.send(payload);
    var jsonObject = JSON.parse(request.responseText);
    error = jsonObject.error;

    if(error == ""){
      //success
      return false;
    }
    else{
      //do whatever
      return false;
    }
  }
  catch(err){
    return false;
  }
}

function openMessageForm(friend_info){
    document.getElementById("messageForm").style.display = "block";
    document.getElementById("friendID").value = friend_info.user_id;
    document.getElementById("friendInfo").innerHTML = ("Send message to "+ friend_info.login)
  //  friend_info.first_name + " " + friend_info.last_name);
}

function submitMessageForm(){
  /*
  $sender_id = $inData->sender_id;
  $recipient_id = $inData->recipient_id;
  $contact_id = $inData->contact_id;
  $message_text = $inData->message_text;
  $status = UNREAD;
  */
  var dropdown = document.getElementById("attachListBody");
  if (dropdown){
      var attachID = dropdown.options[dropdown.selectedIndex].value;
  }

  var messagePayload = '{"sender_id" : "' + window.sessionStorage.getItem("user_id") + '", "recipient_id" : "'
  + document.getElementById("friendID").value + '",';
  if(dropdown){
    messagePayload += '"contact_id" : "'+attachID+ '",';
  }
  messagePayload+='"message_text" : "'+document.getElementById("messageBox").value+'"}';
  closeMessageForm();
  var url = urlBegin + '/sendMessage' + urlEnding;
  var request = new XMLHttpRequest();

  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    request.send(messagePayload);
    var jsonObject = JSON.parse(request.responseText);
    error = jsonObject.error;

    if(error == "")
    {
      //success
      return false;
    }
    else{
      //do whatever
      return false;
    }

  }

  catch(err)
  {
    return false;
  }
}

function closeMessageForm(){
  document.getElementById("messageForm").style.display = "none";
}

function buildAttachList(){
  search = document.getElementById("attachContactBar").value;
  var searchPayload = '{"search" : "' + search + '", "user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';

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

  var list = document.getElementById('attachContactDropdown');
  list.style.display = "inline"
  list.style.width = "40%";
  var listBody = document.createElement("select");
  listBody.id = "attachListBody";
  listBody.style.width = "100%";
  if(contactsArr){
    contactsArr.forEach(function(contactInfo){
      var option = document.createElement('option');
      option.appendChild(document.createTextNode(contactInfo.first_name + " " + contactInfo.last_name));
      option.value = contactInfo.record_id;
      listBody.appendChild(option);
    });
  }

  if (list.childNodes.length > 0){
      list.replaceChild(listBody,list.childNodes[list.childNodes.length-1]);
  }
  else{
    list.appendChild(listBody);
  }
  return false;
}

function addFriend(){
  if (event.key === 'Enter') {
    var payload = '{"user_id" : "' + window.sessionStorage.getItem("user_id") + '", "friend_name" : "' + document.getElementById("friendInput").value + '"}';
    var url = 'http://firstcontacts.net/API/addFriend.php';
    alert(url);
    var request = new XMLHttpRequest();

    request.open("POST", url, false);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{
      request.send(payload);
      var jsonObject = JSON.parse(request.responseText);
      error = jsonObject.error;

      if(error == ""){
        //success
        return false;
      }
      else{
        alert("No user found");
        return false;
      }
    }
    catch(err){
      alert(err);
      return false;
    }
  }
}

function openInbox(){
  window.location.href = "inbox.html";
}
