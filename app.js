var lab1_1 = require("./lab/lab1_1").lab;
var example_1 = require("./example_1").lab;

var aws_info = require("./lab/lab1_2").aws_info;
var aws_new = require("./lab/lab1_2").aws_new;

var urlMap = [
    {path: "/", action: __dirname + "/static/index.html"},
    {path: "/digest", action: lab1_1},
    {path: "/example_1", action: example_1},
    {path: "/aws/info", action: aws_info},
    {path: "/aws/new", action: aws_new}
];

var service = require("./lib/service").http(urlMap);
var PORT = 8080;
service(PORT);

