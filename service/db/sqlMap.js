var sqlMap = {
    user: {
        add: 'insert into user (name, password, nickname) values (?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set'
    },
    product: {
        add: 'insert into product (title, size, imgUrl, price, stock, supplier) values (?,?,?,?,?,?)',
        select: 'select * from product ', 
        update: 'update product set ',
        select_all:'select a.*,b.category_name,b.price,b.minister_price,b.director_price,b.president_price from product a,category b'
    },
    order: {
        add: 'insert into orderlist (consignee, consigneeType, orderProduct, totalAmount) values (?,?,?,?)',
        select: 'select * from orderList ', 
        update: 'update product set '
    },
    category: {
        add: 'insert into category (category_name, price, minister_price, director_price, president_price) values (?,?,?,?,?)',
        select: 'select * from category ', 
        update: 'update category set '
    }
}

module.exports = sqlMap;