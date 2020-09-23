let userData; //info pulled from ViewEvents.php and added in JSON format here

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

function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        document.getElementById('loginPage').style.display = "none";
        document.getElementById('mainPage').style.display = "block";
        return true;
    }
    document.getElementById('loginPage').style.display = "block";
    document.getElementById('mainPage').style.display = "none";
    return false;
}

function checkAuth() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

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
        }
    }
    document.getElementById('errorMessage').innerHTML = "<p>Invalid username or password</p>";
}

checkCookie();