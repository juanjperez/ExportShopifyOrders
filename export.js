
var request = require('request');
var fs = require('fs');
var json2csv = require('json2csv');
var async = require('async');
var _ = require('underscore');
var RateLimiter = require('limiter').RateLimiter;
var flatten = require('flat');

var limiter = new RateLimiter(1, 500);

var apikey = '[private app api key]';
var password = '[private app password]';
var shopname = '[your store name]';

var baseurl = 'https://'+apikey+':'+password+'@'+shopname+'.myshopify.com';
var numOrders = 0;
var ordersList = [];

var getOrders = function(page, callback)
{
	request({
	    url: baseurl+'/admin/orders.json?status=any&limit=250&page='+page,
	    json: true
	}, function (error, response, body) {

   	if (!error && response.statusCode === 200) {

				var newList = [];
				for (var i = 0; i < body.orders.length; i++)
				{
					newList.push(flatten(body.orders[i]));
				}
				
				ordersList = ordersList.concat(newList);
				console.log('Received page :'+page+' - count: '+newList.length);
				console.log('ordersList len:'+ordersList.length);
				console.log();
    }

		callback();	
	})
}

request({
    url: baseurl+'/admin/orders/count.json?status=any',
    json: true
}, function (error, response, body) {
	if (!error && response.statusCode === 200) {
		numOrders = body.count;
	}
	
	console.log('Total Order Count :'+numOrders);
	console.log();
	var numPages = numOrders / 250;
	var r = _.range(1, numPages+1);
	
	async.forEach(r, function(page, callback) {
		limiter.removeTokens(1, function() {
			getOrders(page, callback);
		})
				
	}, function(err) {
		// Called when all are finished
		console.log('Total orders: '+ordersList.length)
		
		json2csv( {data: ordersList, fields : ['closed_at','created_at','email',
		'total_price','browser_ip', 'shipping_address.city', 'shipping_address.province']}, 
			function(err, csv) {
				if (err) console.log(err);
				  fs.writeFile('ShopifyOrders.csv', csv, function(err) {
				    if (err) throw err;
				    console.log('File saved');
				  });
			});
	});
	
	
});



