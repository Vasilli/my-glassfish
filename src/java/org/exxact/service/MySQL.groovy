
package org.exxact.service

import javax.naming.InitialContext
import groovy.sql.Sql

class MySQL {

    def sql

    def MySQL() {

        def ds = new InitialContext().lookup("jdbc/mysql")
        sql = new Sql(ds)
    }

    def final static LOGIN =
        "SELECT id,username,admin,sales FROM exxact.system_users WHERE deleted=0 AND username=? AND passwd=?"

    def testLogin = { user, passwd ->

        def row
        def time = benchmark {
            row = sql.firstRow(LOGIN,[user, passwd])
            sql.close()
        }
        if(row) {
            return [ success:true, time:time, user:[ id:row.id, name:row.username, admin:row.admin, sales:row.sales ] ]
        }
        else {
            return [ success:false, time:time, msg: 'Incorrect user or password.' ]
        }
    }

    def final static READ_USERS =
        "SELECT SQL_CALC_FOUND_ROWS id,username,admin,sales,fullname,date,email,phone,deleted FROM exxact.system_users "

    def readUsers = { sort, dir, search, start, limit ->

        def count = 0, data = [], where = '', orderby = ''
        def time = benchmark {
            if(search) {
                where = " WHERE username LIKE '%${search}%' OR fullname LIKE '%${search}%' "
            }
            if(sort) {
                orderby = " ORDER BY ${sort} ${dir} "
            }
            sql.eachRow(READ_USERS + where + orderby, start, limit) {
                data << [id:it.id,username:it.username,admin:it.admin,sales:it.sales,fullname:it.fullname,date:it.date,email:it.email,phone:it.phone,deleted:it.deleted]
            }
            count = sql.firstRow("SELECT FOUND_ROWS() cnt").cnt
            sql.close()
        }
        if(data) {
            return [ success:true, time:time, data: data, total:count ]
        }
        else {
            return [ success:false, time:time, crud:'select users', err:'some error.' ]
        }
    }

    def final static INSERT_USER =
        "INSERT LOW_PRIORITY exxact.system_users SET username=?,passwd=?,admin=?,sales=?,date=?,fullname=?,email=?,phone=?,deleted=?"

    def createUsers = { user ->

        def id = 0
        def time = benchmark {
            id = sql.executeInsert(INSERT_USER,
            [
                user.username,
                user.passwd,
                user.admin    ? user.admin    : false,
                user.sales    ? user.sales    : false,
                user.date     ? user.date     : '',
                user.fullname ? user.fullname : '',
                user.email    ? user.email    : '',
                user.phone    ? user.phone    : '',
                user.deleted  ? user.admin    : false
            ]
            ).get(0).get(0) as Integer
            sql.close()
        }
        if(id) {
            return [ success:true, time:time, data:[id:id] ]
        }
        else {
            return [ success:false, time:time, crud:'insert user', err:'some error' ]
        }
    }

    def final static UPDATE_USER =
        "UPDATE LOW_PRIORITY exxact.system_users SET "

    def updateUsers = { user ->

        def row = fixJsonToRow(user, 'id'), count = 0
        def time = benchmark {
            count = sql.executeUpdate(UPDATE_USER + "${row.set.join(',')} WHERE id=${user.id}", row.data)
            sql.close()
        }
        if(count) {
            return [success:true, time:time, data: [id:user.id, count:count] ]
        }
        else {
            return [success:false, time:time, crud:'update user', err:'some error' ]
        }
    }

    def final static DELETE_USER =
        "DELETE LOW_PRIORITY FROM exxact.system_users WHERE id=?"

    def eraseUsers = { user ->

        def count = 0
        def time = benchmark {
            count = sql.executeUpdate(DELETE_USER, user.id)
            sql.close()
        }
        if(count) {
            return [ success:true, time:time, data:[id:user.id, count:count] ]
        }
        else {
            return [ success:false, time:time, crud:'delete user', err:'some error' ]
        }
    }

    // Time excecution
    def benchmark = { closure ->
        def start = System.currentTimeMillis()
        closure.call()
        return System.currentTimeMillis() - start
    }

    //
    def fixJsonToRow = { json, myid ->
        def set = [], data = []
        json.each { key, value ->
            if(key != myid && value) {
                set  << "${key}=?"
                data << value
            }
        }
        return [ set:set, data:data ]
    }

}
