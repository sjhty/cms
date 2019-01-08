var sqlMap = {
    user: {
        add: 'insert into user (username, password, nickname) values (?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set'
    },
    product: {
        add: 'insert into user (sku, title, price, size, stock, salesType, supplier) values (?,?,?,?,?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set'
    }
}

module.exports = sqlMap;