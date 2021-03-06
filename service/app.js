const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userApi = require('./api/userApi');
const productApi = require('./api/productApi');
const orderApi = require('./api/orderApi');
const categoryApi = require('./api/categoryApi');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use('/api/user', userApi);
app.use('/api/product', productApi);
app.use('/api/order', orderApi);
app.use('/api/category', categoryApi);

app.listen(3000);
console.log('success listen at port: 3000')