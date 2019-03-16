var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect;

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}

// 增加商品接口
router.post('/addProduct', (req, res) => {
    var sql = $sql.product.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.title, params.size, params.imgUrl, params.price, params.minister_price, params.director_price, params.president_price, params.stock, params.supplier], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 条件查询商品接口
router.post('/searchProduct', (req, res) => {
    var sql = $sql.product.select_all;
    var params = req.body;
    if (params.id && params.title) {
        sql += " where a.category_id=b.id and a.id = " + params.id + " and a.title like '%" + params.title +"%'"
    } else {
        if (params.id) {
            sql += " where a.category_id=b.id and a.id = " + params.id
        } else if (params.title) {
            sql += " where a.category_id=b.id and a.title like '%" + params.title +"%'"
        } else {
            sql += " where a.category_id=b.id"
        }
    }

    //console.log(params)

    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
            //console.log(sql)
        }
    })
});

// ID查询商品接口
router.post('/searchProductById', (req, res) => {
    var sql = $sql.product.select;
    var params = req.body;
    if (params.id) {
        sql += "where id = " + params.id
    }
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// ID修改商品接口
router.post('/updateProductById', (req, res) => {
    var sql = $sql.product.update;
    var params = req.body;
    if (params.id) {
        sql += "title = '"+ params.title +"',size = '"+ params.size +"',imgUrl = '" + params.imgUrl + "',stock = "+params.stock+",supplier = '"+params.supplier+"' where id = " + params.id
    }
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


module.exports = router;