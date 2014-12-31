ExportShopifyOrders
===================

##WHAT:
A node.js based Shopify order exporter that uses the Shopify REST API to export all orders into a CSV file.

##WHY:
I wanted to understand how customers purchase from my customer's Shopify shops.  Exporting to CSV enables pivot tables in Excel where I can slice on a number of dimensions and answer the following questions:

1. Who are my best customers?  Based on number of orders, order size, total amount, frequency, etc...
2. What are the cities and states/provinces where most of the orders are coming from?  How much revenue from each?
3. For those customers that order frequently, what is the frequency?  Monthly, weekly, etc...?

Shopify allows exporting either quarters or months, but it's not possible to export your entire order history through the Shopify web site.

##RUNNING IT:
In order to run this you'll need to create a Shopify Private App in your Shopify Store.  See the Shopify reference on creating a private app: [http://docs.shopify.com/api/authentication/creating-a-private-app](http://docs.shopify.com/api/authentication/creating-a-private-app)

Once you create the private app, replace the following part of export.js with the current values.

```javascript
      var apikey = '[private app api key]';
      var password = '[private app password]';
      var shopname = '[your store name]';
```

Run 'node export.js'

##RESULT
A file named 'ShopifyOrders.csv' will be generated.  Open this file in Excel, select the data, and create a pivot table.

##WHO:
This code is maintained by [ekeepo LLC](http://ekeepo.com).  [View the related blog post.](http://www.ekeepo.com/blog/understanding-your-customers-on-shopify-through-exporting-orders-to-csv)