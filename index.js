/*======================================================================================================================
Filename: index.js
Description: includes user authentication functionality for the home page

Authors:
Simon Lorimer
Alec Fox
Sean Madondo
Josiah Thorpe
======================================================================================================================*/

let userData; //info pulled from index.php and added in JSON format here

$.get('index.php', function (data) {
    userData = JSON.parse(data);
    return;
});

document.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        checkAuth();
    }
});

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

//Function to check cookie exists. If so, display the main page, otherwise display the login/register page
function checkCookie() {
    let username = getCookie('admin');
    if (username != "") {
        document.getElementById('loginPage').style.display = "none";
        document.getElementById('mainPage').style.display = "block";
        return true;
    }
    document.getElementById('loginPage').style.display = "block";
    document.getElementById('mainPage').style.display = "none";
    return false;
}

//Function will check if login credentials are correct, display error message otherwise.
function checkAuth() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value
    let hash = calcMD5(password);
    password = document.getElementById('password').value=hash;

    //Error checks
    if (username === "" || username === null) {
        document.getElementById('password').value = '';
        alert("Please enter in a username!");
        return;
    }

    if (password === "" || password === null) {
        alert("Please enter in a password!");
        return;
    }

    for (let i = 0; i <= userData.length; i++) {
        let each = JSON.parse(userData[i]);
        if (username === each['username']) {
            if (password === each['password']) { // the password needs to be hashed in db and checked against
                document.cookie = username + "=" + username + "; SameSite=Lax";

                //hide login screen, show main page
                document.getElementById('loginPage').style.display = "none";
                document.getElementById('mainPage').style.display = "block";

                return;
            }
            else {
                document.getElementById('password').value = '';
                alert ("Sorry, Invalid Username & Password combination provided");
                return;
            }
        }
        else {
            document.getElementById('password').value = '';
            alert ("Sorry, Invalid Username & Password combination provided");
            return;
        }
    }
    document.getElementById('errorMessage').innerHTML = "<p>Invalid username or password</p>";
}

//============================================ Logout User ===================================================

function logout() {
    document.getElementById('password').value = '';
    document.getElementById('username').value = '';
    document.cookie = "admin=; expires=Fri, 1 Jan 1960 23:59:59 GMT";
    window.location.href = './index.html';
}

checkCookie();