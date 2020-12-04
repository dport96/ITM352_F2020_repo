var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

var products_data = require('./products.json');

app.post("/get_products_data", function (request, response) {
    response.json(products_data);
});

app.use(cookieParser());
app.get("/login", function (request, response) {
    response.cookie('username', 'dport', {maxAge: 60*1000}).send('cookie set!'); //Sets name
});
app.get("/logout", function (request, response) {
    username = request.cookies.username;
    response.clearCookie('username').send(`logged out ${username}`); //Sets name
});
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));