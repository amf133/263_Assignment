let userData; //info pulled from index.php and added in JSON format here

$.get('index.php', function (data) {
    userData = JSON.parse(data);
    return;
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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
    let username = getCookie("username");
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
    console.log(hash);
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
                document.cookie = "username=" + username; //store cookie

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
    document.cookie = name + '=; Max-Age=0';
    document.getElementById('mainPage').style.display = "none";
    document.getElementById('loginPage').style.display = "block";
}


//============================================ REGISTER A NEW USER ===================================================
/* Function to register a new user for the system to the database. This function must also automatically log the user
    into the system automatically after a successful register */

function registerUser() {

    //get credentials
    let username = document.getElementById('register_username').value;
    let password = document.getElementById('register_password').value;
    let retype_password = document.getElementById('retype_password').value;

    //perform error checks
    if (username === "" || username === null) {
        alert("Please enter a valid username");
        return;
    }

    if (password === "" || password === null) {
        alert("Please enter a valid password");
        return;
    }

    if(retype_password !== password) {
        alert("Passwords do not match");
        return;
    }

    //statement to check that the username being registered does not already exist.
    for (let i = 0; i <= userData.length; i++) {
        let each = JSON.parse(userData[i]);
        if (username === each['username']) {
            alert("Sorry, Username " + username + " already exists");
            return;
        }
    }

    //Passowrd needs to be hashed and sent to the database using register.php
    //Cookies need to be set and user needs to be automatically logged in


}

checkCookie();