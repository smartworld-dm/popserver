var builder = require('xmlbuilder');
var fs = require("fs");

exports.generateOrderListXml = (req, res) => {
    console.log(req.params.order);
   /* "vorderid": 123456789,
        "vendorid": 99,
        "url": "https://somewhere.com/123456789.xml",
        "md5": "2b124c00be2c3afe2ce54ae4af3f80ae",
        "priority": 1,
        "date": "20071022-1830"*/

    var xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
    xmlContent+= "<orderlist>";

    for (var i in req.params.order){

        xmlContent+= "<order>";

        Object.keys(req.params.order[i]).forEach(function eachKey(key) {
            console.log(key); // alerts key
            xmlContent+= "<"+key+">";
            xmlContent+= req.params.order[i][key];
            xmlContent+= "</"+key+">";
        });
        xmlContent+= "</order>";
        i++;
    }
    xmlContent+= "</orderlist>";



    var dirPath = './public/';
    var filename = 'orderlist_'+Date.now()+'.xml';

    fs.writeFile( dirPath + filename , xmlContent, function (err_writing_xml_file, success_writing_xml_file) {
        res.success({
            'path': '/public/'+ filename,
            'message':'Xml has been generated Successfully'
        })

    });

}

