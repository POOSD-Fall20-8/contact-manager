var urlBegin = 'http://firstcontacts.net/API';
var urlEnding = '.php';

// Functions for create.html

function createLogin() {

  var user = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPassword").value;
  var pass2 = document.getElementById("passwordConfirm").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;

  if(pass != pass2){
      document.getElementById("createResult").innerHTML = "Passwords Do Not Match";
      return false;
  }
  if(pass == ""){
    document.getElementById("createResult").innerHTML = "Must Set Password";
    return false;
  }
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
  //makes pressing enter in the form submit it correctly
  document.getElementById("updateBox").onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;
    if (key == 13) {
      submitAccountUpdate();
      e.preventDefault();
    }
  }

  var oldLogin = window.sessionStorage.getItem("login");
  document.getElementById("login").value = oldLogin;
  document.getElementById("login").placeholder = "Login";
  document.getElementById("firstName").placeholder = "First Name";
  document.getElementById("lastName").placeholder = "Last Name";
  var oldFirst = window.sessionStorage.getItem("first_name");
  if(oldFirst){
    document.getElementById("firstName").value = oldFirst;
  }
  var oldLast = window.sessionStorage.getItem("last_name");
  if(oldLast){
    document.getElementById("lastName").value = oldLast;
  }
}

function submitAccountUpdate() {
    document.getElementById("updateResult").style.color = "red";
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
    if(login == ""){
      document.getElementById("updateResult").innerHTML = "Login Is Required";
      return false;
    }
    if ((password != password2)){
      document.getElementById("updateResult").innerHTML = "Passwords must match";
      return false;
    }

    window.sessionStorage.setItem("first_name",first_name);
    window.sessionStorage.setItem("last_name",last_name);
    window.sessionStorage.setItem("login",login);

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
        document.getElementById("updateResult").innerHTML = "Account Updated";
        document.getElementById("updateResult").style.color = "lime";
        setTimeout(function(){window.location.href="home.html"} , 1500);
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
    messageButton.setAttribute("src","Images/whiteMessageIcon.png");
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
      buildAttachList();
    });
    row.appendChild(messageButton);

    var deleteButton = document.createElement('input');
    deleteButton.setAttribute("value","");
    deleteButton.setAttribute("type", "image");
    deleteButton.setAttribute("src","Images/whiteDeleteIcon.png")
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
  if (table.childNodes.length > 3){
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
    document.getElementById("sendMessageForm").style.display = "block";
    document.getElementById("friendID").value = friend_info.user_id;
    document.getElementById("friendInfo").innerHTML = ("Send message to "+ friend_info.login)
  //  friend_info.first_name + " " + friend_info.last_name);
  document.getElementById("attachContactBar").onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;
    if (key == 13) {
      e.preventDefault();
    }
  }
}

function submitMessageForm(){
  var dropdown = document.getElementById("attachListBody");
  if (dropdown && (dropdown.options[dropdown.selectedIndex].value != 'noneOption' )){
    var attachID = dropdown.options[dropdown.selectedIndex].value;
  }

  var messagePayload = '{"sender_id" : "' + window.sessionStorage.getItem("user_id") + '", "recipient_id" : "'
  + document.getElementById("friendID").value + '",';
  if(dropdown && (dropdown.options[dropdown.selectedIndex].value != 'noneOption' )){
    messagePayload += '"contact_id" : "'+attachID+ '",';
  }
  messagePayload+='"message_text" : "'+document.getElementById("messageBox").value+'"}';
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
        var statusMessage = document.getElementById("messageSendResult");
        statusMessage.style.color = "blue";
        statusMessage.style.visibility = "visible";
        statusMessage.innerHTML = "Message Sent";
        setTimeout(function(){
          statusMessage.style.visibility = "hidden";
          statusMessage.innerHTML = "Result Placeholder";
          closeMessageForm();
        } , 1500);
      return false;
    }
    else{
      var statusMessage = document.getElementById("messageSendResult");
      statusMessage.style.color = "red";
      statusMessage.style.visibility = "visible";
      statusMessage.innerHTML = "Failed to Send";
      setTimeout(function(){
        statusMessage.style.visibility = "hidden";
        statusMessage.innerHTML = "Result Placeholder";
        closeMessageForm();
      } , 1500);
      return false;
    }
  }

  catch(err){
    var statusMessage = document.getElementById("messageSendResult");
    statusMessage.style.color = "red";
    statusMessage.style.visibility = "visible";
    statusMessage.innerHTML = "Failed to Send";
    setTimeout(function(){
      statusMessage.style.visibility = "hidden";
      statusMessage.innerHTML = "Result Placeholder";
      closeMessageForm();
    } , 1500);
    return false;
  }
}

function closeMessageForm(){
  document.getElementById("sendMessageForm").style.display = "none";
  var list = document.getElementById('attachContactInputs');
    document.getElementById("attachContactBar").value = "";
    document.getElementById("messageBox").value = "";
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

  var list = document.getElementById('attachContactInputs');
  list.style.display = "block";
  list.style.width = "90%";
  var listBody = document.createElement("select");
  listBody.id = "attachListBody";
  listBody.style.position = "relative";
  listBody.style.display = "inline-block";
  listBody.style.width = "40%";
  listBody.style.height = "30px";
  listBody.style.top = "3px";

  var noneOption = document.createElement('option');
  noneOption.appendChild(document.createTextNode("None"));
  noneOption.value = "noneOption";
  listBody.appendChild(noneOption);

  if(contactsArr){
    contactsArr.forEach(function(contactInfo){
      var option = document.createElement('option');
      option.appendChild(document.createTextNode(contactInfo.first_name + " " + contactInfo.last_name));
      option.value = contactInfo.record_id;
      listBody.appendChild(option);
    });
  }

  if (list.childNodes.length > 2){
      list.replaceChild(listBody,list.childNodes[list.childNodes.length-1]);
  }
  else{
    list.appendChild(listBody);
  }
  return false;
}

function addFriend(){

  if (event.key === 'Enter') {
    var friendName = document.getElementById("friendInput").value;
    document.getElementById("friendInput").value = "";
    var payload = '{"user_id" : "' + window.sessionStorage.getItem("user_id") + '", "friend_name" : "' + friendName + '"}';
    var url = urlBegin + '/addFriend' + urlEnding;
    var request = new XMLHttpRequest();

    request.open("POST", url, false);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{
      request.send(payload);
      var jsonObject = JSON.parse(request.responseText);
      error = jsonObject.error;
      if(error == ""){
        //success
        buildFriendsTable();
        var statusMessage = document.getElementById("friendAddResult");
        statusMessage.style.color = "blue";
        statusMessage.style.visibility = "visible";
        statusMessage.innerHTML = "Friend Added";
        setTimeout(function(){
                statusMessage.style.visibility = "hidden";
                statusMessage.innerHTML = "Result Placeholder";
        } , 3000);
        return false;
      }
      else{
        var statusMessage = document.getElementById("friendAddResult");
        statusMessage.style.color = "red";
        statusMessage.style.visibility = "visible";
        if(error == "Already Friends" || error == "No Users Found"){
          statusMessage.innerHTML = error;
        }
        else{
          statusMessage.innerHTML = "Error";
        }
        setTimeout(function(){
                statusMessage.style.visibility = "hidden";
                statusMessage.innerHTML = "placeholder";
        } , 3000);
        return false;
      }
    }
    catch(err){
      var statusMessage = document.getElementById("friendAddResult");
      statusMessage.style.color = "red";
      statusMessage.style.visibility = "visible";
      if(error == "Already Friends" || error == "No Users Found"){
        statusMessage.innerHTML = error;
      }
      else{
        statusMessage.innerHTML = "Error";
      }
      setTimeout(function(){
              statusMessage.style.visibility = "hidden";
              statusMessage.innerHTML = "placeholder";
      } , 3000);
      return false;
    }
  }
}

function goToHome(){
  window.location.href = "home.html";
  return false;
}

function buildMessageTable(){
  var unreadPayload = '{"recipient_id" : "' + window.sessionStorage.getItem("user_id") + '","status": "0"}';
  var readPayload = '{"recipient_id" : "' + window.sessionStorage.getItem("user_id") + '","status": "1"}';
  var url = urlBegin + '/retrieveMessages' + urlEnding;
  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    request.send(unreadPayload);
    var jsonObject = JSON.parse(request.responseText);
    var unreadArr = jsonObject.info.messages.reverse();

    request = new XMLHttpRequest();
   request.open("POST", url, false);
   request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    request.send(readPayload);
    var jsonObject = JSON.parse(request.responseText);
    var readArr = jsonObject.info.messages.reverse();
  }

  catch(err){
    alert(err);
  return false;
}

 var messagesArr = [];
 messagesArr = messagesArr.concat(unreadArr);
 messagesArr = messagesArr.concat(readArr);
  var table = document.getElementById('inboxTable');
  table.style.display = "block";

  tableBody = document.createElement('tbody');
  if(messagesArr){
    messagesArr.forEach(function(messageInfo){
      var row = document.createElement('tr');
      var senderName = "";
      Object.entries(messageInfo).forEach(function([key,value]){
        if(key=='sender_id'){
          var cell = document.createElement('td');
          senderName = getFriendName(value);
          cell.appendChild(document.createTextNode(senderName));
          cell.style.color = "skyblue";
          row.appendChild(cell);
        }
        if(key=='message_text' ){
          var cell = document.createElement('td');
          if(value.length > 15){
            var preview = value.substr(0,12) + "...";
          }
          else{
            var preview = value;
          }

          cell.appendChild(document.createTextNode(preview));
          cell.style.color = "lime";
          row.appendChild(cell);
        }
      });
      if(messageInfo.status == '0'){
        var cell = document.createElement('td');
        var unread = document.createElement("img");
        unread.setAttribute("value","");
        unread.setAttribute("src","Images/unreadIcon.png")
        unread.style.width = "8px";
        unread.style.height = "8px";
        cell.appendChild(unread);
        row.appendChild(cell);
      }
      row.addEventListener("click", function()
      {
        openDisplayMessageForm(messageInfo,senderName);
        buildMessageTable();
      });

      row.onmouseover = function() {
      this.style.backgroundColor = "gray";
      }
      row.onmouseout = function() {
      this.style.backgroundColor = "";
      }

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

function toggleInboxSidebar(){
    var sidebar = document.getElementById("inboxSidebar");
    var sidebarButton = document.getElementById("inboxToggle");
    var sidebarTable = document.getElementById("inboxTable");
    if(sidebar.style.width == "20px"){
      sidebar.style.width = "230px";
      sidebar.style.height = "180px";
     // sidebar.style.overflowY = "scroll";
      sidebar.style.backgroundColor = "#343837";
      sidebarButton.style.backgroundColor = "transparent";
      sidebarButton.style.right = "5px";
      sidebarButton.setAttribute("src","Images/closeIcon.png");
      buildMessageTable();
      sidebarTable.style.display = "block";
    }
    else{
      sidebar.style.width = "20px";
      sidebar.style.height = "20px";
    //  sidebar.style.overflowY = "hidden";
      sidebar.style.backgroundColor = "transparent";
      sidebarButton.style.right = "10px";
      sidebarButton.setAttribute("src","Images/messageIcon.png");
      if(unreadMessages()){
        sidebarButton.style.backgroundColor = "#c04e01";
      }
      sidebarTable.style.display = "none";
    }
}

function initializeInbox(){
  var sidebar = document.getElementById("inboxSidebar");
  var sidebarButton = document.getElementById("inboxToggle");
  sidebar.style.width = "20px";
  sidebar.style.height = "20px";
//  sidebar.style.overflowY = "hidden";
  sidebar.style.backgroundColor = "transparent";
  sidebarButton.setAttribute("value","");
  sidebarButton.setAttribute("type", "image");
  sidebarButton.setAttribute("src", "Images/messageIcon.png");
  if(unreadMessages()){
    sidebarButton.style.backgroundColor = "#c04e01";
  }
}

function unreadMessages(){
  var messagePayload = '{"recipient_id" : "' + window.sessionStorage.getItem("user_id") + '","status": "0"}';
  var url = urlBegin + '/retrieveMessages' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    request.send(messagePayload);

    var jsonObject = JSON.parse(request.responseText);

    var messagesArr = jsonObject.info.messages;
  }

  catch(err){
    return false;
  }
  if(messagesArr.length > 0){
    return true;
  }
  else{
    return false;
  }
}

function getFriendName(idToFind){
  var payload = '{"user_id" : "' + window.sessionStorage.getItem("user_id") + '"}';
  var url = urlBegin + '/retrieveFriends' + urlEnding;
  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    request.send(payload);
    var jsonObject = JSON.parse(request.responseText);
    var friendsArr = jsonObject.info.friends;
  }

  catch(err){
  return "";
  }

  if(friendsArr){
    var retVal = "";
    friendsArr.forEach(function(friendInfo){
      if(friendInfo.user_id == idToFind){
        retVal = friendInfo.login;
        return;
      }
    });
    return retVal;
  }
  else{
    return "";
  }
}

function openDisplayMessageForm(messageInfo,senderName){

  markAsRead(messageInfo.message_id);
  document.getElementById("showMessageForm").style.display = "block";
  document.getElementById("senderInfo").innerHTML = ("Message from "+ senderName);
  document.getElementById("showMessageArea").innerHTML = messageInfo.message_text;
  var buttonsArea = document.getElementById("messageButtons");
  while(buttonsArea.hasChildNodes()){
    buttonsArea.removeChild(buttonsArea.childNodes[0]);
  }

  var deleteButton = document.createElement("input");
  deleteButton.setAttribute("value","");
  deleteButton.setAttribute("type", "image");
  deleteButton.setAttribute("src","Images/deleteIcon.png")
  deleteButton.style.width = "24px";
  deleteButton.style.height = "24px";
  deleteButton.addEventListener("click",function(){
    deleteMessage(messageInfo.message_id);
    closeMessageDisplay();
    buildMessageTable();
  });

  buttonsArea.appendChild(deleteButton);

  var closeButton = document.createElement("input");
  closeButton.setAttribute("value","");
  closeButton.setAttribute("type", "image");
  closeButton.setAttribute("src","Images/closeIcon.png")
  closeButton.style.width = "24px";
  closeButton.style.height = "24px";
  closeButton.addEventListener("click",function(){
    closeMessageDisplay();
    buildMessageTable();
  });

  buttonsArea.appendChild(closeButton);

  var contactInfo = getContactByID(messageInfo.contact_id,messageInfo.sender_id);
  var contactString = "";
  var importButton = document.getElementById("importButton");
  if(contactInfo){
    document.getElementById("importContactLabel").innerHTML = "Import Contact: "+contactInfo.first_name + " " + contactInfo.last_name;
    importButton.setAttribute("src","Images/importIcon.png");
   importButton.setAttribute("value","");
    importButton.setAttribute("type", "image");
    importButton.style.width = "36px";
    importButton.style.height = "36px";
    importButton.style.display = "block";
    importButton.style.marginLeft = "132px";
      importButton.addEventListener("click",function(){
      closeMessageDisplay();
      document.getElementById("fname").value = contactInfo.first_name;
      document.getElementById("lname").value = contactInfo.last_name;
      document.getElementById("email").value = contactInfo.email;
      document.getElementById("pnum").value = contactInfo.phone;
      document.getElementById("addy").value = contactInfo.address;
      document.getElementById("addContactForm").style.display = "block";
      });
  }
  else{
    document.getElementById("importContactLabel").innerHTML = "";
    importButton.style.display = "none";
  }
}

function closeMessageDisplay(){
    document.getElementById("showMessageForm").style.display = "none";
    document.getElementById("senderInfo").innerHTML = "";
    document.getElementById("showMessageArea").innerHTML = "";
    document.getElementById("importContactLabel").innerHTML = "";
}

function getContactByID(contact_id,user_id){
  if(!contact_id){
    return null;
  }
  var searchPayload = '{"record_id" : "' + contact_id + '", "user_id" : "' + user_id + '","search":""}';

  var url = urlBegin + '/searchContact' + urlEnding;

  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    request.send(searchPayload);

    var jsonObject = JSON.parse(request.responseText);

    var contactsArr = jsonObject.info.matched;
  }

  catch(err){
    return null;
  }

  if(contactsArr){
    return contactsArr[0];
  }
  else{
    return null;
  }

}

function markAsRead(message_id){
  var markPayload = '{"message_id" : "' + message_id + '", "status" : "1"}';
  var url = urlBegin + '/markMessage' + urlEnding;
  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    request.send(markPayload);
    var jsonObject = JSON.parse(request.responseText);
  }
  catch(err){
    //error
  }
  if(jsonObject.error){
    //error
  }
}

function deleteMessage(message_id){
  var payload = '{"message_id" : "' + message_id + '"}';
  var url = urlBegin + '/deleteMessage' + urlEnding;
  var request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    request.send(payload);
    var jsonObject = JSON.parse(request.responseText);
  }
  catch(err){
    //error
  }
  if(jsonObject.error){
    //error
  }
}
