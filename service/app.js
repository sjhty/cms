const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userApi = require('./api/userApi');
const productApi = require('./api/productApi');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use('/api/user', userApi);
app.use('/api/product', productApi);

app.listen(3000);
console.log('success listen at port: 3000')