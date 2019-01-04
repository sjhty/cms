var sqlMap = {
    user: {
        add: 'insert into user (username, password, nickname) values (?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set'
    }
}

module.exports = sqlMap;