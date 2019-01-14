var sqlMap = {
    user: {
        add: 'insert into user (name, password, nickname) values (?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set'
    },
    product: {
        add: 'insert into product (title, size, imgUrl, price, stock, supplier) values (?,?,?,?,?,?)',
        select: 'select * from product ', 
        update: 'update product set '
    },
    order: {
        add: 'insert into orderList (consignee, consigneeType, orderProduct, totalAmount) values (?,?,?,?)',
        select: 'select * from orderList ', 
        update: 'update product set '
    }
}

module.exports = sqlMap;