/*======================================================================================================================
Filename: CheckLogin.js
Description: If user is not logged in and they try and navigate to ViewEvents.html or NewEvent.html, they will be
redirected to the home page where they have to log in.

Authors:
Simon Lorimer
Alec Fox
Sean Madondo
Josiah Thorpe
======================================================================================================================*/

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkLogin() {
    var cookie = getCookie('admin');

    if (cookie == "") {
        // logout
        //document.cookie = "admin=; expires=Fri, 1 Jan 1960 23:59:59 GMT";
        window.location.href = './index.html';
    }
}

checkLogin();