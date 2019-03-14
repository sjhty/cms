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
router.post('/addCategory', (req, res) => {
    var sql = $sql.category.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.category_name, params.price, params.minister_price, params.director_price, params.president_price], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 条件查询商品接口
router.post('/searchCategory', (req, res) => {
    var sql = $sql.category.select;
    var params = req.body;
    if (params.id && params.category_name) {
        sql += " where id = " + params.id + " and category_name like '%" + params.category_name +"%'"
    } else {
        if (params.id) {
            sql += "where id = " + params.id
        } else if (params.category_name) {
            sql += "where category_name like '%" + params.category_name +"%'"
        }
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

// ID查询商品接口
router.post('/searchCategoryById', (req, res) => {
    var sql = $sql.category.select;
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
router.post('/updateCategoryById', (req, res) => {
    var sql = $sql.category.update;
    var params = req.body;
    if (params.id) {
        sql += "category_name = '"+ params.category_name +"',price = "+ params.price +",minister_price = "+ params.minister_price +",director_price = "+ params.director_price +",president_price = "+ params.president_price +"' where id = " + params.id
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