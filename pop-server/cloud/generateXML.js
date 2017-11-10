var builder = require('xmlbuilder');
var fs = require("fs");
var htmlToPdf = require('html-to-pdf');

exports.generateXml = (req, res) => {
    var feedImgObj = [];

    if( req.params.image != 'undefined'){
        for(var i = 0; i < req.params.image.length; i++ ) {

            var feedtemp = {};
            feedtemp['image'] =  {
                'imagename': {'#text': req.params.image[i]['imagename']},
                'md5': {'#text': req.params.image[i]['md5']},
                'size': {'#text': req.params.image[i]['size']},
                'filename': {'#text': req.params.image[i]['filename']},
                'url': {'#text': req.params.image[i]['url']},
                'cacheable': {'#text': req.params.image[i]['cacheable']}
            }
            feedImgObj.push(feedtemp);
        }
    }else{

        var feedtemp = {};
        feedtemp['image'] =  {
            'imagename': {'#text': 'null'},
            'md5': {'#text': 'null'},
            'size': {'#text': 'null'},
            'filename': {'#text': 'null'},
            'url': {'#text': 'null'},
            'cacheable': {'#text': 'null'}
        }
        feedImgObj.push(feedtemp);
    }
    var feedImgObj2 = [];
    if( req.params.productlist_images != 'undefined'){
        for(var i = 0; i < req.params.productlist_images.length; i++ ) {
            //console.log(req.params.image[i]);
            var feedtemp2 = {};
            feedtemp2['image'] =  {
                '@charge': "Who Pays",
                'imagename': {'#text': req.params.productlist_images[i]['imagename']},
                'subitemnum': {'#text': req.params.productlist_images[i]['subitemnum']},
                'subimagenum': {'#text': req.params.productlist_images[i]['subimagenum']},
                'pagenumber': {'#text': req.params.productlist_images[i]['pagenumber']},
                'source': {'#text': req.params.productlist_images[i]['source']},
                'type': {'#text': req.params.productlist_images[i]['type']}
            }
            feedImgObj2.push(feedtemp2);
        }
    }else{

        var feedtemp2 = {};
        feedtemp2['image'] =  {
            '@charge': "Who Pays",
            'imagename': {'#text': 'null'},
            'subitemnum': {'#text': 'null'},
            'subimagenum': {'#text': 'null'},
            'pagenumber': {'#text': 'null'},
            'source': {'#text': 'null'},
            'type': {'#text': 'null'}
        }
        feedImgObj2.push(feedtemp2);
    }
    var feedObj = {
        'order': {
            'vendor': {
                'name': {'#text': req.params.vendor_name?req.params.vendor_name:'null'},
                'id': {'#text': req.params.vendor_id?req.params.vendor_id:'null'},
                'sfid': {'#text': req.params.vendor_sfid?req.params.vendor_sfid:'null'},
                'sourcesfid': {'#text':req.params.vendor_sourcesfid?req.params.vendor_sourcesfid:'null'},
                'destinationsfid': {'#text': req.params.vendor_destinationsfid?req.params.vendor_destinationsfid:'null'},
                'vorderid': {'#text': req.params.vendor_vorderid?req.params.vendor_vorderid:'null'},
                'vinvoiceref': {'#text': req.params.vendor_vinvoiceref?req.params.vendor_vinvoiceref:'null'},
                'pcxmlversion': {'#text': req.params.vendor_pcxmlversion?req.params.vendor_pcxmlversion:'null'},
            },

            'orderinfo': {
                'orderdate': {'#text': req.params.orderinfo_orderdate?req.params.orderinfo_orderdate:'null'},
                'orderpriority': {'#text': req.params.orderinfo_orderpriority?req.params.orderinfo_orderpriority:'null'},
                'finishdate': {"#text": req.params.orderinfo_finishdate?req.params.orderinfo_finishdate:'null'},
                'statusurl': {"#text": req.params.orderinfo_statusurl?req.params.orderinfo_statusurl:'null'},
                'link': {"#text": req.params.orderinfo_link?req.params.orderinfo_link:'null'},
                'ordercurrency': {"#text": req.params.orderinfo_ordercurrency?req.params.orderinfo_ordercurrency:'null'},
                'customsvalue': {"#text": req.params.orderinfo_customsvalue?req.params.orderinfo_customsvalue:'null'},
                'couponcode': {'#text': req.params.orderinfo_couponcode?req.params.orderinfo_couponcode:'null'},
                'batch': {
                    'name': {'#text': req.params.orderinfo_batch_name?req.params.orderinfo_batch_name:'null'},
                    'total': {"#text": req.params.orderinfo_batch_total?req.params.orderinfo_batch_total:'null'},
                    'entry': {'#text': req.params.orderinfo_batch_entry?req.params.orderinfo_batch_entry:'null'}
                },
                'services': {
                    'service': {
                        'type': {'#text':  req.params.orderinfo_services_service_type?req.params.orderinfo_services_service_type:'null'},
                        'value': {'#text': req.params.orderinfo_services_service_value?req.params.orderinfo_services_service_value:'null'},
                        'totaltax': {'#text': req.params.orderinfo_services_service_totaltax?req.params.orderinfo_services_service_totaltax:'null'},
                        'taxes': {
                            'tax': {
                                'type': {'#text': req.params.orderinfo_services_service_tax_type?req.params.orderinfo_services_service_tax_type:'null'},
                                'description': {'#text': req.params.orderinfo_services_service_tax_description?req.params.orderinfo_services_service_tax_description:'null'},
                                'amount': {
                                    '#text': req.params.orderinfo_services_service_tax_amount?req.params.orderinfo_services_service_tax_amount:'null'
                                }
                            }
                        }
                    }
                }
            },
            'promotion': {
                'type': {'#text': req.params.promotion_type?req.params.promotion_type:'null'}
            },
            'customer': {
                'cvid': {'#text': req.params.customer_cvid?req.params.customer_cvid:'null'},
                'pcid': {'#text': req.params.customer_pcid?req.params.customer_pcid:'null'},
                'title': {'#text': req.params.customer_title?req.params.customer_title:'null'},
                'fname': {'#text': req.params.customer_fname?req.params.customer_fname:'null'},
                'lname': {'#text': req.params.customer_lname?req.params.customer_lname:'null'},
                'phone1': {'#text': req.params.customer_phone1?req.params.customer_phone1:'null'},
                'phone2': {'#text': req.params.customer_phone2?req.params.customer_phone2:'null'},
                'email': {'#text': req.params.customer_email?req.params.customer_email:'null'}
            },
            'payments': {
                'payment': {
                    'type': {'#text': req.params.payments_payment_type?req.params.payments_payment_type:'null'},
                    'description': {'#text': req.params.payments_payment_description?req.params.payments_payment_description:'null'},
                    'date': {'#text': req.params.payments_payment_date?req.params.payments_payment_date:'null'},
                    'reference': {'#text': req.params.payments_payment_reference?req.params.payments_payment_reference:'null'},
                    'amount': {'#text': req.params.payments_payment_amount?req.params.payments_payment_amount:'null'}
                }
            },
            'shippings': {
                'title': {'#text': req.params.shippings_title?req.params.shippings_title:'null'},
                'fname': {'#text': req.params.shippings_fname?req.params.shippings_fname:'null'},
                'lname': {'#text': req.params.shippings_lname?req.params.shippings_lname:'null'},
                'address1': {'#text': req.params.shippings_address1?req.params.shippings_address1:'null'},
                'address2': {'#text': req.params.shippings_address2?req.params.shippings_address2:'null'},
                'address3': {'#text': req.params.shippings_address3?req.params.shippings_address3:'null'},
                'city': {'#text': req.params.shippings_city?req.params.shippings_city:'null'},
                'state': {'#text': req.params.shippings_state?req.params.shippings_state:'null'},
                'postcode': {'#text': req.params.shippings_postcode?req.params.shippings_postcode:'null'},
                'countryname': {'#text': req.params.shippings_countryname?req.params.shippings_countryname:'null'},
                'countrycode': {'#text': req.params.shippings_countrycode?req.params.shippings_countrycode:'null'},
                'phone1': {'#text': req.params.shippings_phone1?req.params.shippings_phone1:'null'},
                'phone2': {'#text': req.params.shippings_phone2?req.params.shippings_phone2:'null'},
                'email': {'#text': req.params.shippings_email?req.params.shippings_email:'null'},
                'method': {'#text': req.params.shippings_method?req.params.shippings_method:'null'},
                'totalfreight': {'#text': req.params.shippings_totalfreight?req.params.shippings_totalfreight:'null'},
                'totalfreighttax': {'#text': req.params.shippings_totalfreighttax?req.params.shippings_totalfreighttax:'null'},
                'taxes': {
                    'tax': {
                        'type': {'#text': req.params.shippings_taxes_tax_type?req.params.shippings_taxes_tax_type:'null'},
                        'description': {'#text': req.params.shippings_taxes_tax_description?req.params.shippings_taxes_tax_description:'null'},
                        'amount': {'#text': req.params.shippings_taxes_tax_amount?req.params.shippings_taxes_tax_amount:'null'}
                    }
                }
            },
            'productlist': {
                'item': {
                    'itemnum': {'#text': req.params.productlist_item_itemnum?req.params.productlist_item_itemnum:'null'},
                    'productcode': {'#text': req.params.productlist_item_productcode?req.params.productlist_item_productcode:'null'},
                    'productdesc': {'#text': req.params.productlist_item_productdesc?req.params.productlist_item_productdesc:'null'},
                    'stylecode': {'#text': req.params.productlist_item_stylecode?req.params.productlist_item_stylecode:'null'},
                    'styledesc': {'#text': req.params.productlist_item_styledesc?req.params.productlist_item_styledesc:'null'},
                    'qty': {'#text': req.params.productlist_item_qty?req.params.productlist_item_qty:'null'},
                    'custom': {},
                    'itemprice': {'#text': req.params.productlist_item_itemprice?req.params.productlist_item_itemprice:'null'},
                    'itempricetax': {'#text': req.params.productlist_item_itempricetax?req.params.productlist_item_itempricetax:'null'},
                    'taxes': {
                        'tax': {
                            'type': {'#text': req.params.productlist_item_taxes_tax_type?req.params.productlist_item_taxes_tax_type:'null'},
                            'description': {'#text': req.params.productlist_item_taxes_tax_description?req.params.productlist_item_taxes_tax_description:'null'},
                            'amount': {'#text': req.params.productlist_item_taxes_tax_amount?req.params.productlist_item_taxes_tax_amount:'null'}
                        }
                    },
                    'inserts': {
                        'insert': {
                            'insertcode': {"#text":req.params.productlist_item_inserts_insert_insertcode?req.params.productlist_item_inserts_insert_insertcode:'null'},
                            'description': {'#text': req.params.productlist_item_inserts_insert_description?req.params.productlist_item_inserts_insert_description:'null'},
                        }
                    },
                    'images': feedImgObj2,
                    'services': {
                        'service': {
                            'type': {'#text': req.params.services_service_type?req.params.services_service_type:'null'},
                            'value': {'#text': req.params.services_service_value?req.params.services_service_value:'null'},
                            'totaltax': {'#text': req.params.services_service_totaltax?req.params.services_service_totaltax:'null'},
                            'taxes': {
                                'tax': {
                                    'type': {'#text': req.params.services_service_taxes_tax_type?req.params.services_service_taxes_tax_type:'null'},
                                    'description': {'#text': req.params.services_service_taxes_tax_description?req.params.services_service_taxes_tax_description:'null'},
                                    'amount': {'#text': req.params.services_service_taxes_tax_amount?req.params.services_service_taxes_tax_amount:'null'}
                                }
                            }
                        }
                    }
                }
            },
            'imagelist': feedImgObj
        }
    }



    var feed = builder.create(feedObj, { encoding: 'utf-8' })
    var dirPath = './public/';
    var filename = 'order_'+Date.now()+'.xml';


    var inspect = require('util').inspect;

    fs.writeFile( dirPath + filename , feed, function (err_writing_xml_file, success_writing_xml_file) {

        //Preparing pdf content on basis of jounalId.
        var journalId = req.params.journalId;
        var pdfContent ='';

        var header = "<!DOCTYPE html>";
        header +='<html>';
        header +="<head>";
        header +="</head>";
        header +='<body style="margin:0; padding: 0; border: 0;">';

        pdfContent += header;

        var promise = new Parse.Promise();

        var Journal = Parse.Object.extend("Journal");

        var query = new Parse.Query(Journal);

        query.equalTo("objectId",journalId);
        //Fetch Journal Details.

        query.first().then(function(result){
            if(result) {
                // If result was defined, the object with this objectID was found

                promise.resolve(result);
                var pageDetail = result.get("pageDetail");
                var albumSize = result.get("albumSize");

                console.log(albumSize.objectId);
                console.log(albumSize.className);

                /*var config = {
                            'margin':'0',
                            'padding':'0',
                            'width':'8in',
                            'height':'11in',
                            "type": "pdf,jpg,jpeg,png"
                }*/



                var albumpromise = new Parse.Promise();

                var albumClass = Parse.Object.extend(albumSize.className);

                var albumQuery = new Parse.Query(albumClass);

                albumQuery.equalTo("objectId",albumSize.objectId);

                albumQuery.first().then(

                    function(albumresult){

                        var tdWidthInInches     = "";
                        var tdHeightInInches    = "";
                        var tdHeight            = ""; 
                        var tdWidth             = '8';

                        if(albumresult) {

                            var albumSizeName       = albumresult.get("name");
                            var measurements        = albumSizeName.split(" ");
                                                        //Image Widths
                         if(measurements[0] == '8' && measurements[2] == '11"' ) {
                                var config = {
                                    'margin':'0',
                                    'padding':'0',
                                    'width':'8in',
                                    'height':'11in',
                                    "type": "pdf,jpg,jpeg,png"
                                }

                        
                                    for (var i in pageDetail) {
                                        console.log(pageDetail[i].template);


                                       /* if(pageDetail[i].template =="TEMPLATE_1"  &&  pageDetail[i].photos[0]["photoURL"]!=null) {
                                            


                                            var template_1 ='<div style="margin:0; padding: 0; width: 100%; display:inline-block; overflow:hidden; ">';
                                            

                                            template_1+='<div style="float: left;  height:8in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                                template_1+='</div>';



                                            template_1 +='</div>';

                                            pdfContent += template_1;
                                 
                                        }*/

                                        if(pageDetail[i].template =="TEMPLATE_2" && ( pageDetail[i].photos[0]["photoURL"]!=null || pageDetail[i].photos[1]["photoURL"]!=null )) {


                                            var template_2 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            
                                            if( pageDetail[i].photos[0]["photoURL"]!=null) {
                                                template_2+='<div style="float: left; height:4in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                                template_2+='</div>';
                                                
                                            }
                                            if( pageDetail[i].photos[1]["photoURL"]!=null) {
                                                template_2+='<div style="float: left;  height:4in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat; ">'; 

                                                template_2+='</div>';
                                            }

                                            template_2+='</div>';
                                            pdfContent += template_2;

                                        }

                                        else if(pageDetail[i].template =="TEMPLATE_3" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null))
                                        {
                                             var template_3 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            
                                            if( pageDetail[i].photos[0]["photoURL"]!=null) {
                                                template_3+='<div style="float: left; height:8.05in; overflow:hidden; margin:1% 0.5% 1% 1%; padding: 0; width: 48.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"></div>'; 
                                                
                                            }
                                            if( pageDetail[i].photos[1]["photoURL"]!=null) {
                                                template_3+='<div style="float: left;  height:8.05in; overflow:hidden; margin:1% 1% 1% 0.5%; padding: 0; width: 48.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"></div>'; 

                                             
                                            }

                                            template_3 += "</div>";

                                            pdfContent += template_3;

                                        }

                                        else if(pageDetail[i].template =="TEMPLATE_4" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null)) {

                                            var template_4 = '<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                                template_4 += '<div style="float: left; height:8.05in; overflow:hidden; margin:1% 0.5% 1% 1%; padding: 0; width: 48.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                            }

                                            if( pageDetail[i].photos[1]["photoURL"]==null &&  pageDetail[i].photos[2]["photoURL"]==null) {

                                            } else {

                                                template_4 += '<div style="margin:1% 1% 1% 0.5%; float: left; height:8.05in; width: 48.5%;  overflow:hidden; ">';

                                                if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                    
                                                        template_4 +='<div style="float: left; height:4in; overflow:hidden; margin: 0 0 1% 0; margin-right:0; padding: 0; width: 100%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                }

                                                if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                   
                                                    template_4 +='<div style="float: left; height:4in; overflow:hidden; margin:1% 0 0 0; margin-right:0; padding: 0; width: 100%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }
                                                template_4 +=  '</div>'
                                            }

                                            template_4 +=  '</div>';

                                            pdfContent += template_4;

                                        }

                                        else if(pageDetail[i].template =="TEMPLATE_5" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null)) {

                                            var template_5 = '<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            if( pageDetail[i].photos[1]["photoURL"]!=null || pageDetail[i].photos[0]["photoURL"]!=null ) {
                                           

                                                template_5 += '<div style="margin:1% 0.5% 1% 1%; float: left; height:8in; width: 48.5%;  overflow:hidden; ">';

                                                template_5 +='<div style="float: left; height:4in; overflow:hidden; margin:0 0 1% 0; padding: 0; width: 100%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                 template_5 +='<div style="float: left; height:4in; overflow:hidden; margin:1% 0 0 0; margin-left:0; padding: 0; width: 100%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>';

                                                 template_5 +=  '</div>'; 
                                            }
                                            if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                        template_5 += '<div style="float: left; height:8.05in; overflow:hidden; margin:1% 0 1% 0.5%; padding: 0; width: 48.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                   
                                                    
                                                }

                                           
                                            template_5 +=  '</div>';

                                            pdfContent += template_5;

                                        }
                                        else if(pageDetail[i].template =="TEMPLATE_6" &&
                                            (  pageDetail[i].photos[0]["photoURL"]!=null ||
                                            pageDetail[i].photos[1]["photoURL"]!=null ||
                                            pageDetail[i].photos[2]["photoURL"]!=null )
                                        )
                                        {
                                            var template_6 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            
                                            if( pageDetail[i].photos[0]["photoURL"]!=null) {
                                                template_6+='<div style="float: left; height:4in; overflow:hidden; margin:1% 0.5% 1% 1%; padding: 0; width: 98.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                                template_6+='</div>';
                                                
                                            }
                                            template_6 += '<div style="margin:1% 1% 0.5% 1%; float: left; height:4.1in; width: 98.5%;  overflow:hidden; ">';

                                                if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                    
                                                        template_6 +='<div style="float: left; height:4.1in; overflow:hidden; margin:0 0.5% 0 0 ;  padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                }

                                                if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                   
                                                    template_6 +='<div style="float: left; height:4.1in; overflow:hidden; margin:0 0 1% 0.5%;  padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }

                                            template_6+='</div>';
                                            pdfContent += template_6;
                                        }

                                         else if(pageDetail[i].template =="TEMPLATE_7" &&
                                            (  pageDetail[i].photos[0]["photoURL"]!=null ||
                                            pageDetail[i].photos[1]["photoURL"]!=null ||
                                            pageDetail[i].photos[2]["photoURL"]!=null )
                                        )
                                        {
                                            var template_7 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            
                                            //if( pageDetail[i].photos[0]["photoURL"]!=null || pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                template_7 += '<div style="float: left; height:4in; width: 98%; margin:1% 1% 1% 1%;  overflow:hidden; ">';

                                                template_7 +='<div style="float: left; height:4in; overflow:hidden; margin:0 0 0.5% 0; margin-left:0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>';

                                                template_7 +='<div style="float: left; height:4in; overflow:hidden; margin:0 0 0 0.5%; margin-right:0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                template_7+='</div>';
                                                
                                            //}
                                           // if(pageDetail[i].photos[2]["photoURL"]!=null) {

                                                template_7+='<div style="float: left; height:4in; overflow:hidden; margin:0 1% 1% 1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                                template_7+='</div>';
                                            //}
                                            
                                            template_7+='</div>';
                                            pdfContent += template_7;
                                        }

                                        else if(pageDetail[i].template =="TEMPLATE_9" &&
                                            ( pageDetail[i].photos[0]["photoURL"]!=null ||
                                            pageDetail[i].photos[1]["photoURL"]!=null ||
                                            pageDetail[i].photos[2]["photoURL"]!=null ||
                                            pageDetail[i].photos[3]["photoURL"]!=null )
                                        )
                                        {
                                            var template_9 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                                template_9 += '<div style="margin:1%; float: left; height:4in; width: 98%;  overflow:hidden; ">';

                                                template_9 +='<div style="float: left; height:4in; overflow:hidden; margin:0 0.5% 0.5% 0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>';

                                                template_9 +='<div style="float: left; height:4in; overflow:hidden; margin:0 0 0.5% 0.5%; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                template_9+='</div>';

                                                template_9 += '<div style="margin:0 1% 1% 1%; float: left; height:4.05in; width: 98%;  overflow:hidden; ">';
                                                template_9 +='<div style="float: left; height:4in; overflow:hidden; margin:0 0.5% 0 0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>';
                                                template_9 +='<div style="float: left; height:4in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                template_9+='</div>';



                                            template_9+='</div>';
                                            pdfContent += template_9;

                                        }

                                        else if(pageDetail[i].template =="TEMPLATE_10" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null))
                                        {
                                            var template_10='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                                template_10 += '<div style="float: left; height:8.05in; overflow:hidden; margin:1% 0.5% 1% 1%; padding: 0; width: 68.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                            //}

                                            template_10 += '<div style="margin:1% 1% 1% 0.5%; float: left; height:8.1in; width: 28.5%;  overflow:hidden; ">';

                                                //if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                    
                                                        template_10 +='<div style="float: left; height:2.67in; overflow:hidden; margin:0 0 0.5% 0; margin-right:0; padding: 0; width: 100%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                //}

                                                //if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                   
                                                    template_10 +='<div style="float: left; height:2.67in; overflow:hidden; margin:0.5% 0; margin-right:0; padding: 0; width: 100%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                //}
                                                //if( pageDetail[i].photos[3]["photoURL"]!=null ) {

                                                   
                                                    template_10 +='<div style="float: left; height:2.67in; overflow:hidden; margin: 0; margin-right:0; padding: 0; width: 100%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                //}
                                                template_10 +=  '</div>';

                                            template_10 +=  '</div>';


                                            pdfContent += template_10;

                                        }

                                        else if(pageDetail[i].template =="TEMPLATE_11" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null))
                                        {
                                            var template_11='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            

                                            template_11 += '<div style="margin:1% 0.5% 1% 1% ; float: left; height:8.05in; width: 28.5%;  overflow:hidden; ">';

                                                if( pageDetail[i].photos[0]["photoURL"]!=null ) {

                                                    
                                                        template_11 +='<div style="float: left; height:2.67in; overflow:hidden; margin:0 0 0.5% 0; margin-left:0; padding: 0; width: 100%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                }

                                                if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                   
                                                    template_11 +='<div style="float: left; height:2.67in; overflow:hidden; margin:margin:0.5% 0;  padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }
                                                if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                   
                                                    template_11 +='<div style="float: left; height:2.67in; overflow:hidden; margin:margin:0.5% 0 0 0; margin-left:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }
                                                template_11 +=  '</div>';

                                             if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                                template_11 += '<div style="float: left; height:8.05in; overflow:hidden; margin:1% 1% 1% 0.5%; padding: 0; width: 68%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                            }

                                            template_11 +=  '</div>';


                                            pdfContent += template_11;

                                        }

                                       else if(pageDetail[i].template =="TEMPLATE_12" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null))
                                        {
                                            var template_12='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            template_12 += '<div style="margin:1% 1% 0 1%; float: left; height:2.66in; width: 98%;  overflow:hidden; ">';

                                                if( pageDetail[i].photos[0]["photoURL"]!=null ) {

                                                    
                                                    template_12 +='<div style="float: left; height:2.66in; overflow:hidden; margin:0 0.5% 1% 0; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                }

                                                if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                   
                                                    template_12 +='<div style="float: left; height:2.66in; overflow:hidden; margin:1% 0.5% 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }
                                                if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                   
                                                    template_12 +='<div style="float: left; height:2.66in; overflow:hidden; margin:1% 0 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }
                                            template_12 +=  '</div>';

                                             if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                                template_12 += '<div style="float: left; height:5.36in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                            }

                                            template_12 +=  '</div>';


                                            pdfContent += template_12;
                                             
                                        }

                                         else if(pageDetail[i].template =="TEMPLATE_13" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null))
                                        {
                                            var template_13='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                             if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                                template_13 += '<div style="float: left; height:5.39in; overflow:hidden; margin:1% 1% 0 1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                            }

                                            template_13 += '<div style="margin:1% 1% 0 1%; float: left; height:2.66in; width: 98%;  overflow:hidden; ">';

                                             if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                    
                                             template_13 +='<div style="float: left; height:2.66in; overflow:hidden; margin:1% 0.5% 1% 0; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                }

                                                if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                   
                                                    template_13 +='<div style="float: left; height:2.66in; overflow:hidden; margin:1% 0.5% 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }


                                                if( pageDetail[i].photos[3]["photoURL"]!=null ) {

                                                   
                                                    template_13 +='<div style="float: left; height:2.66in; overflow:hidden; margin:1% 0 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }

                                             template_13 +=  '</div>';

                                             template_13 +=  '</div>';


                                            pdfContent += template_13;
                                        }

                                        else if(pageDetail[i].template =="TEMPLATE_14" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null)) 
                                        {
                                            console.log(pageDetail[i].photos[0]["photoURL"]);
                                            console.log(pageDetail[i].photos[1]["photoURL"]);
                                            console.log(pageDetail[i].photos[2]["photoURL"]);
                                            console.log(pageDetail[i].photos[3]["photoURL"]);
                                            console.log(pageDetail[i].photos[4]["photoURL"]);


                                            var template_14='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                                template_14 +='<div style="float: left; height:5.5in; width:98%; overflow: hidden; margin: 1%  1% 0 1%;" >';

                                                //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                                template_14 += '<div style="float: left; height:5.5in; overflow:hidden; margin:1% 0.5% 0.5% 0; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                 template_14 +='<div style="float: left; height:5.5n; width:29.5%; margin: 1% 0 1% 0.5%; overflow: hidden;">';
                                                //if( pageDetail[i].photos[1]["photoURL"]!=null ) {
                                                
                                                template_14 += '<div style="float: left; height:2.7in; overflow:hidden; margin:0 0 1%; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                //if( pageDetail[i].photos[2]["photoURL"]!=null ) {
                                                template_14 += '<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0 1%; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}
                                                 template_14 +='</div>';

                                                template_14 +='</div>';

                                                template_14 +='<div style="float: left; height:2.7in; width:98%; overflow: hidden; margin: 0 1% 1% 1%;">';

                                                //if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                                template_14 += '<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0.5% 0 0; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                            
                                                //if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                                template_14 += '<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0 0 0.5%; padding: 0; width: 29.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[4]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                template_14 +=  '</div>';



                                                template_14 +=  '</div>';
                                                pdfContent += template_14;


                                        }

                                       else if(pageDetail[i].template =="TEMPLATE_15" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null) ) 
                                        {

                                            var template_15='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                                template_15 +='<div style="float: left; height:5.4in; width:98%; overflow: hidden; margin: 1% 1% 0 1%" >';

                                                template_15 +='<div style="float: left; height:5.4n; width:30%; margin: 0; overflow: hidden;">';
                                                //if( pageDetail[i].photos[1]["photoURL"]!=null ) {
                                                
                                                template_15 += '<div style="float: left; height:2.7in; overflow:hidden; margin:0 0.5% 1% 0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                //if( pageDetail[i].photos[2]["photoURL"]!=null ) {
                                                template_15 += '<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0.5% 0 0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}
                                                 template_15 +='</div>';

                                                //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                                template_15 += '<div style="float: left; height:5.4in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                template_15 +='</div>';

                                                template_15 +='<div style="float: left; height:2.7in; width:98%; overflow: hidden; margin: 0 1%;">';

                                                //if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                                template_15 += '<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0.5% 0 0 ; padding: 0; width: 29.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                //if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                                template_15 += '<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0 0 0.5%; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[4]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}


                                                template_15 +=  '</div>';

                                                template_15 +=  '</div>';
                                                pdfContent += template_15;
                                        


                                        }
                                         else if(pageDetail[i].template =="TEMPLATE_16" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null)) 
                                        {

                                            var template_16='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            template_16 += '<div style="margin:1% 1% 1% 1%; float: left; height:2.7in; width: 98%;  overflow:hidden; ">';

                                                if( pageDetail[i].photos[0]["photoURL"]!=null ) {

                                                    
                                                    template_16 +='<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0.5% 1% 0; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                                }

                                                if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                   
                                                    template_16 +='<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0.5% 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }
                                                if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                   
                                                    template_16 +='<div style="float: left; height:2.7in; overflow:hidden; margin:1% 0 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                }
                                            template_16 +=  '</div>';

                                            template_16 += '<div style="margin:0% 1% 1% 1%; float: left; height:5.4in; width: 98%;  overflow:hidden; ">';

                                             if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                                template_16 += '<div style="float: left; height:5.4in; overflow:hidden; margin:0 0.5% 0 0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                            }
                                             if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                                template_16 += '<div style="float: left; height:5.4in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                            }

                                            template_16 +=  '</div>';

                                            template_16 +=  '</div>';

                                            pdfContent += template_16;


                                        }

                                       else if(pageDetail[i].template =="TEMPLATE_17" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null)) 
                                        {
                                            var template_17='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            template_17 += '<div style="margin:1%; float: left; height:5.4in; width: 98%;  overflow:hidden; ">';

                                             //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                                template_17 += '<div style="float: left; height:5.4in; overflow:hidden; margin:0 0.5% 0 0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                           //}
                                             //if( pageDetail[i].photos[1]["photoURL"]!=null ) {
                                                template_17+= '<div style="float: left; height:5.4in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                           // }

                                            template_17 +=  '</div>';

                                            template_17 += '<div style="margin:0% 1% 0 1%; float: left; height:2.7in; width: 98%;  overflow:hidden; ">';

                                               // if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                    
                                                    template_17 +='<div style="float: left; height:2.7in; overflow:hidden; margin:0 0.5% 1% 0; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                               // }

                                                //if( pageDetail[i].photos[3]["photoURL"]!=null ) {

                                                   
                                                    template_17 +='<div style="float: left; height:2.7in; overflow:hidden; margin:0 0.5% 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                //}
                                                //if( pageDetail[i].photos[4]["photoURL"]!=null ) {

                                                   
                                                    template_17 +='<div style="float: left; height:2.7in; overflow:hidden; margin:0 0 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[4]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                    
                                                //}
                                            template_17 +=  '</div>';

                                            template_17 +=  '</div>';

                                            pdfContent += template_17;

                                        }
                                         else if(pageDetail[i].template =="TEMPLATE_18" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null ||  pageDetail[i].photos[5]["photoURL"]!=null)) 
                                        {
                                            var template_18='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                                template_18 +='<div style="float: left; height:5.4in; width:98%; overflow: hidden; margin: 1%  1% 1% 1%;" >';

                                                //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                                template_18 += '<div style="float: left; height:5.4in; overflow:hidden; margin:0 0.5% 0.5% 0; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 


                                                 //}

                                                 template_18 +='<div style="float: left; height:5.4in; width:29.5%; margin: 0 0 1% 0.5%; overflow: hidden;">';
                                                //if( pageDetail[i].photos[1]["photoURL"]!=null ) {
                                                
                                                template_18 += '<div style="float: left; height:2.7in; overflow:hidden; margin:0 0 1%; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                //if( pageDetail[i].photos[2]["photoURL"]!=null ) {
                                                template_18 += '<div style="float: left; height:2.7in; overflow:hidden; margin:0 0 1%; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}
                                                 template_18 +='</div>';

                                                template_18 +='</div>';

                                                template_18 +='<div style="float: left; height:2.7in; width:98%; overflow: hidden; margin: 0 1%;">';

                                                //if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                                template_18 += '<div style="float: left; height:2.7in; overflow:hidden; margin:0 0.5% 0 0 ; padding: 0; width: 32.8%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                            
                                                //if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                                template_18 += '<div style="float: left; height:2.7in; overflow:hidden; margin:0 0.5% 0 0.5%; padding: 0; width: 32.33%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[4]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                 //if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                                template_18 += '<div style="float: left; height:2.7in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 32.8%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                 //}

                                                template_18 +=  '</div>';

                                                template_18 +=  '</div>';
                                                pdfContent += template_18;

                                        }
                                
                
                                    }

                            } 
                           else if(measurements[0] == '8' && measurements[2] == '8"' ) {
                                var config = {
                                    'margin':'0',
                                    'padding':'0',
                                    'width':'8in',
                                    'height':'8in',
                                    "type": "pdf,jpg,jpeg,png"
                                }

                                for (var i in pageDetail) 
                                {
                                    console.log(pageDetail[i].template);




                                    if(pageDetail[i].template =="TEMPLATE_1"  &&  pageDetail[i].photos[0]["photoURL"]!=null) {
                                        


                                        var template_1 ='<div style="margin:0; padding: 0; width: 100%; display:inline-block; overflow:hidden; ">';
                                        

                                        template_1+='<div style="float: left;  height:5.72in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                            template_1+='</div>';



                                        template_1 +='</div>';

                                        pdfContent += template_1;
                             
                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_2" && ( pageDetail[i].photos[0]["photoURL"]!=null || pageDetail[i].photos[1]["photoURL"]!=null )) {


                                        var template_2 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        
                                        if( pageDetail[i].photos[0]["photoURL"]!=null) {
                                            template_2+='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                            template_2+='</div>';
                                            
                                        }
                                        if( pageDetail[i].photos[1]["photoURL"]!=null) {
                                            template_2+='<div style="float: left;  height:2.86in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                            template_2+='</div>';
                                        }

                                        template_2+='</div>';
                                        pdfContent += template_2;

                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_3" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null))
                                    {
                                         var template_3 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        
                                        if( pageDetail[i].photos[0]["photoURL"]!=null) {
                                            template_3+='<div style="float: left; height:5.83in; overflow:hidden; margin:1%; padding: 0; width: 48%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"></div>'; 
                                            
                                        }
                                        if( pageDetail[i].photos[1]["photoURL"]!=null) {
                                            template_3+='<div style="float: left;  height:5.83in; overflow:hidden; margin:1%; padding: 0; width: 48%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"></div>'; 

                                         
                                        }

                                        template_3 += "</div>";

                                        pdfContent += template_3;

                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_4" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null)) {

                                        var template_4 = '<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                            template_4 += '<div style="float: left; height:5.83in; overflow:hidden; margin:1%; padding: 0; width: 48%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                        }

                                        if( pageDetail[i].photos[1]["photoURL"]==null &&  pageDetail[i].photos[2]["photoURL"]==null) {

                                        } else {

                                            template_4 += '<div style="margin:1%; float: left; height:5.83in; width: 48%;  overflow:hidden; ">';

                                            if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                
                                                    template_4 +='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; margin-right:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            }

                                            if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                               
                                                template_4 +='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; margin-right:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }
                                            template_4 +=  '</div>'
                                        }

                                        template_4 +=  '</div>';

                                        pdfContent += template_4;

                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_5" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null)) {

                                        var template_5 = '<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        if( pageDetail[i].photos[1]["photoURL"]!=null || pageDetail[i].photos[0]["photoURL"]!=null ) {
                                       

                                            template_5 += '<div style="margin:1%; float: left; height:5.83in; width: 48%;  overflow:hidden; ">';
                                            template_5 +='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; margin-left:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             template_5 +='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; margin-left:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>';
                                             template_5 +=  '</div>'; 
                                        }
                                        if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                    template_5 += '<div style="float: left; height:5.83in; overflow:hidden; margin:1%; padding: 0; width: 48%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                               
                                                
                                            }

                                       
                                        template_5 +=  '</div>';

                                        pdfContent += template_5;

                                    }
                                     else if(pageDetail[i].template =="TEMPLATE_6" &&
                                        (  pageDetail[i].photos[0]["photoURL"]!=null ||
                                        pageDetail[i].photos[1]["photoURL"]!=null ||
                                        pageDetail[i].photos[2]["photoURL"]!=null )
                                    )
                                    {
                                        var template_6 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        
                                        if( pageDetail[i].photos[0]["photoURL"]!=null) {
                                            template_6+='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                            template_6+='</div>';
                                            
                                        }
                                        template_6 += '<div style="margin:1%; float: left; height:2.86in; width: 98%;  overflow:hidden; ">';

                                            if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                
                                                    template_6 +='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; margin-left:0; padding: 0; width: 49%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            }

                                            if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                               
                                                template_6 +='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; margin-right:0; padding: 0; width: 49%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }

                                        template_6+='</div>';
                                        pdfContent += template_6;
                                    }

                                     else if(pageDetail[i].template =="TEMPLATE_7" &&
                                        (  pageDetail[i].photos[0]["photoURL"]!=null ||
                                        pageDetail[i].photos[1]["photoURL"]!=null ||
                                        pageDetail[i].photos[2]["photoURL"]!=null )
                                    )
                                    {
                                        var template_7 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        
                                        //if( pageDetail[i].photos[0]["photoURL"]!=null || pageDetail[i].photos[1]["photoURL"]!=null ) {

                                            template_7 += '<div style="margin:1%; float: left; height:2.86in; width: 98%;  overflow:hidden; ">';
                                            template_7 +='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; margin-left:0; padding: 0; width: 49%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>';
                                            template_7 +='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; margin-right:0; padding: 0; width: 49%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            template_7+='</div>';
                                            
                                        //}
                                       // if(pageDetail[i].photos[2]["photoURL"]!=null) {

                                            template_7+='<div style="float: left; height:2.86in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;">'; 

                                            template_7+='</div>';
                                        //}
                                        
                                        template_7+='</div>';
                                        pdfContent += template_7;
                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_9" &&
                                        ( pageDetail[i].photos[0]["photoURL"]!=null ||
                                        pageDetail[i].photos[1]["photoURL"]!=null ||
                                        pageDetail[i].photos[2]["photoURL"]!=null ||
                                        pageDetail[i].photos[3]["photoURL"]!=null )
                                    )
                                    {
                                        var template_9 ='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            template_9 += '<div style="margin:1%; float: left; height:2.89in; width: 98%;  overflow:hidden; ">';
                                            template_9 +='<div style="float: left; height:2.89in; overflow:hidden; margin:1% 0.5% 0 0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>';
                                            template_9 +='<div style="float: left; height:2.89in; overflow:hidden; margin:1% 0 0 0.5%; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            template_9+='</div>';

                                            template_9 += '<div style="margin:0 1% 1% 1%; float: left; height:2.89in; width: 98%;  overflow:hidden; ">';
                                            template_9 +='<div style="float: left; height:2.89in; overflow:hidden; margin:0 0.5% 0 0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>';
                                            template_9 +='<div style="float: left; height:2.89in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            template_9+='</div>';



                                        template_9+='</div>';
                                        pdfContent += template_9;

                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_10" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null))
                                    {
                                        var template_10='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                            template_10 += '<div style="float: left; height:5.83in; overflow:hidden; margin:1%; padding: 0; width: 68%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                        //}

                                        template_10 += '<div style="margin:1%; float: left; height:5.83in; width: 28%;  overflow:hidden; ">';

                                            //if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                
                                                    template_10 +='<div style="float: left; height:1.943in; overflow:hidden; margin:1%; margin-right:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            //}

                                            //if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                               
                                                template_10 +='<div style="float: left; height:1.943in; overflow:hidden; margin:1%; margin-right:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            //}
                                            //if( pageDetail[i].photos[3]["photoURL"]!=null ) {

                                               
                                                template_10 +='<div style="float: left; height:1.943in; overflow:hidden; margin:1%; margin-right:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            //}
                                            template_10 +=  '</div>';

                                        template_10 +=  '</div>';


                                        pdfContent += template_10;

                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_11" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null))
                                    {
                                        var template_11='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        

                                        template_11 += '<div style="margin:1%; float: left; height:5.83in; width: 28%;  overflow:hidden; ">';

                                            if( pageDetail[i].photos[0]["photoURL"]!=null ) {

                                                
                                                    template_11 +='<div style="float: left; height:1.943in; overflow:hidden; margin:1%; margin-left:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            }

                                            if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                               
                                                template_11 +='<div style="float: left; height:1.943in; overflow:hidden; margin:1%; margin-left:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }
                                            if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                               
                                                template_11 +='<div style="float: left; height:1.943in; overflow:hidden; margin:1%; margin-left:0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }
                                            template_11 +=  '</div>';

                                         if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                            template_11 += '<div style="float: left; height:5.83in; overflow:hidden; margin:1%; padding: 0; width: 68%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                        }

                                        template_11 +=  '</div>';


                                        pdfContent += template_11;

                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_12" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null))
                                    {
                                        var template_12='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        template_12 += '<div style="margin:1% 1% 0 1%; float: left; height:1.77in; width: 98%;  overflow:hidden; ">';

                                            if( pageDetail[i].photos[0]["photoURL"]!=null ) {

                                                
                                                template_12 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0.5% 1% 0; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            }

                                            if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                               
                                                template_12 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0.5% 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }
                                            if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                               
                                                template_12 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }
                                        template_12 +=  '</div>';

                                         if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                            template_12 += '<div style="float: left; height:4.13in; overflow:hidden; margin:1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                        }

                                        template_12 +=  '</div>';


                                        pdfContent += template_12;
                                         
                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_13" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null))
                                    {
                                        var template_13='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                         if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                            template_13 += '<div style="float: left; height:4in; overflow:hidden; margin:1% 1% 0 1%; padding: 0; width: 98%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                        }

                                        template_13 += '<div style="margin:1% 1% 0 1%; float: left; height:1.77in; width: 98%;  overflow:hidden; ">';

                                         if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                                
                                         template_13 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0.5% 1% 0; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            }

                                            if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                               
                                                template_13 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0.5% 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }


                                            if( pageDetail[i].photos[3]["photoURL"]!=null ) {

                                               
                                                template_13 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }

                                         template_13 +=  '</div>';

                                         template_13 +=  '</div>';


                                        pdfContent += template_13;
                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_14" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null)) 
                                    {
                                        console.log(pageDetail[i].photos[0]["photoURL"]);
                                        console.log(pageDetail[i].photos[1]["photoURL"]);
                                        console.log(pageDetail[i].photos[2]["photoURL"]);
                                        console.log(pageDetail[i].photos[3]["photoURL"]);
                                        console.log(pageDetail[i].photos[4]["photoURL"]);


                                        var template_14='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            template_14 +='<div style="float: left; height:4.1in; width:98%; overflow: hidden; margin: 1%  1% 0 1%;" >';

                                            //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                            template_14 += '<div style="float: left; height:4in; overflow:hidden; margin:1% 0.5% 0.5% 0; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                             template_14 +='<div style="float: left; height:4in; width:29.5%; margin: 1% 0 1% 0.5%; overflow: hidden;">';
                                            //if( pageDetail[i].photos[1]["photoURL"]!=null ) {
                                            
                                            template_14 += '<div style="float: left; height:2in; overflow:hidden; margin:0 0 1%; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                            //if( pageDetail[i].photos[2]["photoURL"]!=null ) {
                                            template_14 += '<div style="float: left; height:2in; overflow:hidden; margin:1% 0 1%; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}
                                             template_14 +='</div>';

                                            template_14 +='</div>';

                                            template_14 +='<div style="float: left; height:1.87in; width:98%; overflow: hidden; margin: 0 1%;">';

                                            //if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                            template_14 += '<div style="float: left; height:1.87in; overflow:hidden; margin:1% 0.5% 0 0; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                        
                                            //if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                            template_14 += '<div style="float: left; height:1.87in; overflow:hidden; margin:1% 0 0 0.5%; padding: 0; width: 29.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[4]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                            template_14 +=  '</div>';



                                            template_14 +=  '</div>';
                                            pdfContent += template_14;


                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_15" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null) ) 
                                    {

                                        var template_15='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            template_15 +='<div style="float: left; height:4in; width:98%; overflow: hidden; margin: 1% 1% 0 1%" >';

                                            template_15 +='<div style="float: left; height:4in; width:30%; margin: 0; overflow: hidden;">';
                                            //if( pageDetail[i].photos[1]["photoURL"]!=null ) {
                                            
                                            template_15 += '<div style="float: left; height:2in; overflow:hidden; margin:0 0.5% 1% 0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                            //if( pageDetail[i].photos[2]["photoURL"]!=null ) {
                                            template_15 += '<div style="float: left; height:2in; overflow:hidden; margin:1% 0.5% 0 0; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}
                                             template_15 +='</div>';

                                            //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                            template_15 += '<div style="float: left; height:4in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                            template_15 +='</div>';

                                            template_15 +='<div style="float: left; height:1.87in; width:98%; overflow: hidden; margin: 0 1%;">';

                                            //if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                            template_15 += '<div style="float: left; height:1.87in; overflow:hidden; margin:1% 0.5% 0 0 ; padding: 0; width: 29.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                            //if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                            template_15 += '<div style="float: left; height:1.87in; overflow:hidden; margin:1% 0 0 0.5%; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[4]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}


                                            template_15 +=  '</div>';

                                            template_15 +=  '</div>';
                                            pdfContent += template_15;
                                    


                                    }
                                    else if(pageDetail[i].template =="TEMPLATE_16" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null)) 
                                    {

                                        var template_16='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        template_16 += '<div style="margin:1% 1% 1% 1%; float: left; height:1.77in; width: 98%;  overflow:hidden; ">';

                                            if( pageDetail[i].photos[0]["photoURL"]!=null ) {

                                                
                                                template_16 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0.5% 1% 0; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                            }

                                            if( pageDetail[i].photos[1]["photoURL"]!=null ) {

                                               
                                                template_16 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0.5% 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }
                                            if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                               
                                                template_16 +='<div style="float: left; height:1.77in; overflow:hidden; margin:1% 0 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            }
                                        template_16 +=  '</div>';

                                        template_16 += '<div style="margin:0% 1% 0 1%; float: left; height:4.1in; width: 98%;  overflow:hidden; ">';

                                         if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                            template_16 += '<div style="float: left; height:4.1in; overflow:hidden; margin:0 0.5% 0 0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                        }
                                         if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                            template_16 += '<div style="float: left; height:4.1in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                        }

                                        template_16 +=  '</div>';

                                        template_16 +=  '</div>';

                                        pdfContent += template_16;


                                    }

                                    else if(pageDetail[i].template =="TEMPLATE_17" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null)) 
                                    {
                                        var template_17='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                        template_17 += '<div style="margin:1%; float: left; height:4.1in; width: 98%;  overflow:hidden; ">';

                                         //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                            template_17 += '<div style="float: left; height:4.1in; overflow:hidden; margin:0 0.5% 0 0; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                       //}
                                         //if( pageDetail[i].photos[1]["photoURL"]!=null ) {
                                            template_17+= '<div style="float: left; height:4.1in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 49.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                       // }

                                        template_17 +=  '</div>';

                                        template_17 += '<div style="margin:0% 1% 0 1%; float: left; height:1.77in; width: 98%;  overflow:hidden; ">';

                                           // if( pageDetail[i].photos[2]["photoURL"]!=null ) {

                                                
                                                template_17 +='<div style="float: left; height:1.77in; overflow:hidden; margin:0 0.5% 1% 0; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 

                                           // }

                                            //if( pageDetail[i].photos[3]["photoURL"]!=null ) {

                                               
                                                template_17 +='<div style="float: left; height:1.77in; overflow:hidden; margin:0 0.5% 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            //}
                                            //if( pageDetail[i].photos[4]["photoURL"]!=null ) {

                                               
                                                template_17 +='<div style="float: left; height:1.77in; overflow:hidden; margin:0 0 1% 0.5%; padding: 0; width: 32.65%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[4]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                                
                                            //}
                                        template_17 +=  '</div>';

                                        template_17 +=  '</div>';

                                        pdfContent += template_17;

                                    }
                                    else if(pageDetail[i].template =="TEMPLATE_18" && ( pageDetail[i].photos[0]["photoURL"]!=null ||  pageDetail[i].photos[1]["photoURL"]!=null ||  pageDetail[i].photos[2]["photoURL"]!=null ||  pageDetail[i].photos[3]["photoURL"]!=null ||  pageDetail[i].photos[4]["photoURL"]!=null ||  pageDetail[i].photos[5]["photoURL"]!=null)) 
                                    {
                                        var template_18='<div style="margin:0; width:100%; height:100%; padding: 0;  display:inline-block; overflow:hidden;">';

                                            template_18 +='<div style="float: left; height:4in; width:98%; overflow: hidden; margin: 1%  1% 1% 1%;" >';

                                            //if( pageDetail[i].photos[0]["photoURL"]!=null ) {
                                            template_18 += '<div style="float: left; height:4in; overflow:hidden; margin:0 0.5% 0.5% 0; padding: 0; width: 69.5%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 


                                             //}

                                             template_18 +='<div style="float: left; height:4in; width:29.5%; margin: 0 0 1% 0.5%; overflow: hidden;">';
                                            //if( pageDetail[i].photos[1]["photoURL"]!=null ) {
                                            
                                            template_18 += '<div style="float: left; height:2in; overflow:hidden; margin:0 0 1%; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[1]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                            //if( pageDetail[i].photos[2]["photoURL"]!=null ) {
                                            template_18 += '<div style="float: left; height:2in; overflow:hidden; margin:0 0 1%; padding: 0; width: 99%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[2]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}
                                             template_18 +='</div>';

                                            template_18 +='</div>';

                                            template_18 +='<div style="float: left; height:1.77in; width:98%; overflow: hidden; margin: 0 1%;">';

                                            //if( pageDetail[i].photos[3]["photoURL"]!=null ) {
                                            template_18 += '<div style="float: left; height:1.77in; overflow:hidden; margin:0 0.5% 0 0 ; padding: 0; width: 32.8%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[3]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                        
                                            //if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                            template_18 += '<div style="float: left; height:1.77in; overflow:hidden; margin:0 0.5% 0 0.5%; padding: 0; width: 32.33%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[4]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                             //if( pageDetail[i].photos[4]["photoURL"]!=null ) {
                                            template_18 += '<div style="float: left; height:1.77in; overflow:hidden; margin:0 0 0 0.5%; padding: 0; width: 32.8%; box-sizing:border-box;  background-image: url('+pageDetail[i].photos[0]["photoURL"]+');background-size: cover;background-position: center center; background-repeat: no-repeat;"> </div>'; 
                                             //}

                                            template_18 +=  '</div>';

                                            template_18 +=  '</div>';
                                            pdfContent += template_18;

                                    }
                            
            
                                }

                            } //Ends else if here..

                           // else if( 4*8)


                        }

                        var footer ='</body></html>';
                        pdfContent = pdfContent+footer;


                        var pdffilename = 'order_'+Date.now()+'_'+journalId+'.pdf';
                        console.log('pdffilename'+ pdffilename);
         
                        var dirPath = './public/';
                        var htmlfilename = 'order_'+Date.now()+'.html';


                        var inspect = require('util').inspect;
                      
                        fs.writeFile( dirPath + htmlfilename , pdfContent, function (err_writing_html_file, success_writing_xml_file) 
                        {

                        var html = fs.readFileSync(dirPath + htmlfilename , 'utf8');
                       
      
                        var pdf = require('html-pdf');
                    
                        setTimeout(function(){ 
                                 
                                pdf.create(html, config).toFile(dirPath+pdffilename, function (error, success) {
                                        if (error) {
                                            console.log('Oh noes! Errorz!');
                                            console.log(error);
                                        } else {
                                            console.log(success.filename);
                                            res.success({
                                                'xml_path': '/public/'+ filename,
                                                'pdf_path': dirPath+ pdffilename,
                                                'html_path': dirPath+ htmlfilename,
                                                'message':'Xml has been generated Successfully'
                                            });

                                        }
                                    });
                            }, 3000);

                       
                        });

                    });
            } else {
                console.log("Journal ID: " + journalId + " was not found");
                promise.resolve(null);

            }

        }, function(error){
            console.error("Error searching for journalId with id: " + journalId + " Error: " + error);
            promise.error(error);
        });






    });

}


