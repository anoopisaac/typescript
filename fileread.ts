
declare var require: any;
var fs = require('fs'),
xml2js = require('xml2js');

 
var parser = new xml2js.Parser();

console.log("were");
var test;

var helo;

// fs.readFile('./books.xml', function(err, data) {
//     parser.parseString(data, function (err, result) {
//         console.dir(result);

//     });
// });  

var userTestStatus: { id: number, name: string }[] = [
    { "id": 1, "name": "Ready" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
];


class Test{
    constructor(hello:number){

    }
}

class Test2{

}

new Test2(1)






