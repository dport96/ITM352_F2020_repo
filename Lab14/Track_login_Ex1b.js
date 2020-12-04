var express = require('express');
var app = express();
var myParser = require("body-parser");
const fs = require('fs');

const user_data_filename = 'user_data.json';

var current_username; // store username on server
var login_err = {username:'', password:''};

// check if file exists before reading
if (fs.existsSync(user_data_filename)) {
    stats = fs.statSync(user_data_filename);
    console.log(`user_data.json has ${stats['size']} characters`);

    var data = fs.readFileSync(user_data_filename, 'utf-8');
    users_reg_data = JSON.parse(data);
}

    app.use(myParser.urlencoded({ extended: true }));

    app.get("/login", function (request, response) {
        str = '';
        if(typeof current_username != 'undefined') {
            str = `Currently logged in: ${current_username}<br>`;
        }
        // Give a simple login form
        str += `
<body>
<form action="process_login" method="POST">
<input type="text" name="username" value="${login_err['username']}" size="40" placeholder="enter username" >${1}<br />
<input type="password" name="password" size="40" placeholder="enter password">${1}<br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
        response.send(str);
    });

    app.post("/process_login", function (request, response) {
        // Process login form POST and redirect to logged in page if ok, back to login page if not
        console.log(request.body);
        login_err['username']='';
        login_err['password'] = ''; 

        // if user exists, get their password
        if (typeof users_reg_data[request.body.username] != 'undefined') {
            if (request.body.password == users_reg_data[request.body.username].password) {
                response.redirect('/login');
            } else {
               // str = `<script>alert('Hey! ${request.body.password} does not match what we have for you!');window.history.back();</script>`;
               login_err['username'] = request.body.username;
            }
        } else {
            login_err['password'] = request.body.password;
        }
        response.redirect('/login');

    });

    app.use(express.static('./static'));
    app.listen(8080, () => console.log(`listening on port 8080`));

