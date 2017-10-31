var fs = require('fs'), xml2js = require('xml2js');
var parser = new xml2js.Parser();
console.log("were");
var test;
var helo;
// fs.readFile('./books.xml', function(err, data) {
//     parser.parseString(data, function (err, result) {
//         console.dir(result);
//     });
// });  
var userTestStatus = [
    { "id": 1, "name": "Ready" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
];
var Test = /** @class */ (function () {
    function Test(hello) {
        this.x = [1, 2, 3];
    }
    Test.prototype.printSomething = function () {
        console.log("hai");
    };
    return Test;
}());
console.log(new Test(2)['x']);
//# sourceMappingURL=fileread.js.map