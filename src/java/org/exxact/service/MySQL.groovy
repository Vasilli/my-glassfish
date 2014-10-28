
package org.exxact.service

import javax.naming.InitialContext
import groovy.sql.Sql

class MySQL {

    def sql

    def MySQL() {
        def ds = new InitialContext().lookup("jdbc/mysql")
        sql = new Sql(ds)
    }

/*Uses*/
    def final static LOGIN =
        "SELECT id,username,admin,sales FROM exxact.system_users WHERE deleted=0 AND username=? AND passwd=?"
    def testLogin = { user, passwd ->

        def row
        def time = benchmark {
            row = sql.firstRow(LOGIN,[user, passwd])
            sql.close()
        }
        if(row) return [ success:true,  time:time, user:[ id:row.id, name:row.username, admin:row.admin, sales:row.sales ] ]
        else    return [ success:false, time:time, msg: 'Incorrect user or password.' ]
    }

    def final static READ_USERS =
        "SELECT SQL_CALC_FOUND_ROWS id,username,admin,sales,fullname,date,email,phone,deleted FROM exxact.system_users "
    def readUsers = { sort, dir, search, start, limit ->

        def count = 0, data = [], where = ''
        def time = benchmark {
            if(search) {
                where = " WHERE username LIKE '%${search}%' OR fullname LIKE '%${search}%' "
            }
            sql.eachRow(READ_USERS + " ${where} ORDER BY ${sort} ${dir} ", start, limit) {
                data << [
                    id:      it.id,
                    username:it.username,
                    admin:   it.admin,
                    sales:   it.sales,
                    fullname:it.fullname,
                    date:    it.date,
                    email:   it.email,
                    phone:   it.phone,
                    deleted: it.deleted
                ]
            }
            count = sql.firstRow("SELECT FOUND_ROWS() cnt").cnt
            sql.close()
        }
        if(data) return [ success:true,  time:time, data: data, total:count ]
        else     return [ success:false, time:time, crud:'select users', err:'some error.' ]
    }
    
    def final static INSERT_USER =
        "INSERT LOW_PRIORITY exxact.system_users SET username=?,passwd=?,admin=?,sales=?,date=?,fullname=?,email=?,phone=?,deleted=?"
    def createUsers = { user ->

        def id = 0
        def time = benchmark {
            id = sql.executeInsert(INSERT_USER, [
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
        if(id) return [ success:true,  time:time, data:[id:id] ]
        else   return [ success:false, time:time, crud:'insert user', err:'some error' ]
    }

    def final static UPDATE_USER =
        "UPDATE LOW_PRIORITY exxact.system_users SET "
    def updateUsers = { user ->

        def row = fixJsonToRow(user, 'id'), count = 0
        def time = benchmark {
            count = sql.executeUpdate(UPDATE_USER + "${row.set.join(',')} WHERE id=${user.id}", row.data)
            sql.close()
        }
        if(count) return [success:true,  time:time, data: [id:user.id, count:count] ]
        else      return [success:false, time:time, crud:'update user', err:'some error' ]
    }

    def final static DELETE_USER =
        "DELETE LOW_PRIORITY FROM exxact.system_users WHERE id=?"
    def eraseUsers = { user ->

        def count = 0
        def time = benchmark {
            count = sql.executeUpdate(DELETE_USER, user.id)
            sql.close()
        }
        if(count) return [ success:true,  time:time, data:[id:user.id, count:count] ]
        else      return [ success:false, time:time, crud:'delete user', err:'some error' ]
    }

/*Parts*/
    def readParts = { sort, dir, search, start, limit ->

        def count = 0, data = [], where = ''
        def time = benchmark {
            if(search) {
                where = " WHERE ep.mfr_pn LIKE '%${search}%' "
            }
            sql.eachRow(
                " SELECT SQL_CALC_FOUND_ROWS ep.id id,ep.cat cat,ep.mfr_pn mfr_pn,ep.description description," +
                " ep.cost cost,ep.ingramSKU ingramSKU,ec.cat_name cat_name " +
                " FROM exxact.parts ep " +
                " LEFT JOIN exxact.part_cats ec ON(ep.cat=ec.cat_id) ${where}" +
                " ORDER BY ${sort} ${dir} ", start, limit) {

                data << [
                    id:         it.id,
                    cat:        it.cat,
                    mfr_pn:     it.mfr_pn,
                    description:it.description,
                    cost:       it.cost,
                    ingramSKU:  it.ingramSKU,
                    cat_name:   it.cat_name
                ]
            }
            count = sql.firstRow("SELECT FOUND_ROWS() cnt").cnt
            sql.close()
        }
        if(data) return [ success:true,  time:time, data: data, total:count ]
        else     return [ success:false, time:time, crud:'select parts', err:'some error.' ]
    }

    def final static INSERT_PART =
        "INSERT LOW_PRIORITY exxact.parts SET cat=?,mfr_pn=?,description=?,cost=?,ingramSKU=?"
    def createParts = { part ->

        def id = 0
        def time = benchmark {
            id = sql.executeInsert(INSERT_PART, [
                part.cat         ? part.cat         : 0,
                part.mfr_pn      ? part.mfr_pn      : '',
                part.description ? part.description : '',
                part.cost        ? part.cost        : 0,
                part.ingramSKU   ? part.ingramSKU   : ''
            ]
            ).get(0).get(0) as Integer
            sql.close()
        }
        if(id) return [ success:true,  time:time, data:[id:id] ]
        else   return [ success:false, time:time, crud:'insert part', err:'some error' ]
    }

    def final static UPDATE_PART =
        "UPDATE LOW_PRIORITY exxact.parts SET "
    def updateParts = { part ->

        def row = fixJsonToRow(part, 'id'), count = 0
        def time = benchmark {
            count = sql.executeUpdate(UPDATE_PART + "${row.set.join(',')} WHERE id=${part.id}", row.data)
            sql.close()
        }
        if(count) return [success:true,  time:time, data: [id:part.id, count:count] ]
        else      return [success:false, time:time, crud:'update part', err:'some error' ]
    }

    def final static DELETE_PART =
        "DELETE LOW_PRIORITY FROM exxact.parts WHERE id=?"
    def eraseParts = { part ->

        def count = 0
        def time = benchmark {
            count = sql.executeUpdate(DELETE_PART, part.id)
            sql.close()
        }
        if(count) return [ success:true,  time:time, data:[id:part.id, count:count] ]
        else      return [ success:false, time:time, crud:'delete part', err:'some error' ]
    }

    def final static SELECT_CATS =
        "SELECT SQL_CALC_FOUND_ROWS cat_id,cat_name FROM exxact.part_cats "

    def readCats = { search, start, limit ->

        def count = 0, data = [], where = ''
        def time = benchmark {
            if(search) {
                where = " WHERE cat_name LIKE '%${search}%' "
            }
            sql.eachRow(SELECT_CATS + where, start, limit) {

                data << [ cat_id:it.cat_id, cat_name:it.cat_name ]
            }
            count = sql.firstRow("SELECT FOUND_ROWS() cnt").cnt
            sql.close()
        }
        if(data) return [ success:true,  time:time, data: data, total:count ]
        else     return [ success:false, time:time, crud:'select cats', err:'some error.' ]
    }

/*Casts*/
    def final static READ_CUSTS =
        "SELECT SQL_CALC_FOUND_ROWS cp.id id,cp.profile_name profile_name,cp.terms terms,cp.tax_rate tax_rate," +
        "cp.b_company b_company,cp.b_attn b_attn,cp.b_street1 b_street1,cp.b_street2 b_street2," +
        "cp.b_csz b_csz,cp.b_contact b_contact,cp.b_phone b_phone,cp.b_email b_email," +
        "cp.s_company s_company,cp.s_attn s_attn,cp.s_street1 s_street1,cp.s_street2 s_street2," +
        "cp.s_csz s_csz,cp.s_contact s_contact,cp.s_phone s_phone,cp.s_email s_email," +
        "cp.ownerID ownerID,cp.deleted deleted,su.username username " +
        "FROM exxact.customer_profiles cp " +
        "LEFT JOIN exxact.system_users su ON (cp.ownerID=su.id) "
    def readCusts = { sort, dir, search, start, limit ->

        def count = 0, data = [], where = ''
        def time = benchmark {
            if(search) {
                where = " WHERE cp.profile_name LIKE '%${search}%' "
            }
            sql.eachRow(READ_CUSTS + " ${where} ORDER BY cp.${sort} ${dir} ", start, limit) {
                data << [
                    id:          it.id,
                    profile_name:it.profile_name,
                    terms:       it.terms,
                    tax_rate:    it.tax_rate,
                    b_company:   it.b_company,
                    b_attn:      it.b_attn,
                    b_street1:   it.b_street1,
                    b_street2:   it.b_street2,
                    b_csz:       it.b_csz,
                    b_contact:   it.b_contact,
                    b_phone:     it.b_phone,
                    b_email:     it.b_email,
                    s_company:   it.s_company,
                    s_attn:      it.s_attn,
                    s_street1:   it.s_street1,
                    s_street2:   it.s_street2,
                    s_csz:       it.s_csz,
                    s_contact:   it.s_contact,
                    s_phone:     it.s_phone,
                    s_email:     it.s_email,
                    ownerID:     it.ownerID,
                    deleted:     it.deleted,
                    username:    it.username
                ]
            }
            count = sql.firstRow("SELECT FOUND_ROWS() cnt").cnt
            sql.close()
        }
        if(data) return [ success:true,  time:time, data: data, total:count ]
        else     return [ success:false, time:time, crud:'select custs', err:'some error.' ]
    }
    
    def final static INSERT_CUSTS =
        "INSERT LOW_PRIORITY exxact.customer_profiles SET " +
        "profile_name=?,terms=?,tax_rate=?," +
        "b_company=?,b_attn=?,b_street1=?,b_street2=?,b_csz=?,b_contact=?,b_phone=?,b_email=?," +
        "s_company=?,s_attn=?,s_street1=?,s_street2=?,s_csz=?,s_contact=?,s_phone=?,s_email=?," +
        "ownerID=?,deleted=?"
    def createCusts = { cust ->

        def id = 0
        def time = benchmark {
            id = sql.executeInsert(INSERT_CUSTS, [
                cust.profile_name,
                cust.terms     ? cust.terms     : '',
                cust.tax_rate  ? cust.tax_rate  : 0,
                cust.b_company ? cust.b_company : '',
                cust.b_attn    ? cust.b_attn    : '',
                cust.b_street1 ? cust.b_street1 : '',
                cust.b_street2 ? cust.b_street2 : '',
                cust.b_csz     ? cust.b_csz     : '',
                cust.b_contact ? cust.b_contact : '',
                cust.b_phone   ? cust.b_phone   : '',
                cust.b_email   ? cust.b_email   : '',
                cust.s_company ? cust.s_company : '',
                cust.s_attn    ? cust.s_attn    : '',
                cust.s_street1 ? cust.s_street1 : '',
                cust.s_street2 ? cust.s_street2 : '',
                cust.s_csz     ? cust.s_csz     : '',
                cust.s_contact ? cust.s_contact : '',
                cust.s_phone   ? cust.s_phone   : '',
                cust.s_email   ? cust.s_email   : '',
                cust.ownerID   ? cust.ownerID   : 0,
                cust.deleted   ? cust.deleted   : false
            ]
            ).get(0).get(0) as Integer
            sql.close()
        }
        if(id) return [ success:true,  time:time, data:[id:id] ]
        else   return [ success:false, time:time, crud:'insert cust', err:'some error' ]
    }

    def final static UPDATE_CUSTS =
        "UPDATE LOW_PRIORITY exxact.customer_profiles SET "
    def updateCusts = { cust ->

        def row = fixJsonToRow(cust, 'id'), count = 0
        def time = benchmark {
            count = sql.executeUpdate(UPDATE_CUSTS + " ${row.set.join(',')} WHERE id=${cust.id}", row.data)
            sql.close()
        }
        if(count) return [success:true,  time:time, data: [id:cust.id, count:count] ]
        else      return [success:false, time:time, crud:'update cust', err:'some error' ]
    }

    def final static DELETE_CUSTS =
        "DELETE LOW_PRIORITY FROM exxact.customer_profiles WHERE id=?"
    def eraseCusts = { cust ->

        def count = 0
        def time = benchmark {
            count = sql.executeUpdate(DELETE_CUSTS, cust.id)
            sql.close()
        }
        if(count) return [ success:true,  time:time, data:[id:cust.id, count:count] ]
        else      return [ success:false, time:time, crud:'delete cust', err:'some error' ]
    }

/*Quotes*/
    def final static READ_QUOTES =
        "SELECT SQL_CALC_FOUND_ROWS qtd.id id,qtd.qo_id qo_id,qtd.date date,esy.fullname fullname,ecp.profile_name profile_name," +
        "ecp.b_contact b_contact,qtd.quote_name quote_name,qtd.cost cost,qtd.base_gp base_gp " +
        //"SELECT SQL_CALC_FOUND_ROWS qtd.id id,qtd.qo_id qo_id,qtd.cid cid,qtd.part_id part_id,qtd.eta eta,qtd.cust_id cust_id," +
        //"qtd.sys_qty sys_qty,qtd.date date,qtd.dateStamp dateStamp,qtd.ship_method ship_method," +
        //"qtd.salesperson salesperson,qtd.sales_email sales_email,qtd.sales_phone sales_phone,qtd.base_gp base_gp," +
        //"qtd.option_gp option_gp,qtd.mfr_pn mfr_pn,qtd.part_desc part_desc,qtd.qty qty,qtd.cost cost," +
        //"qtd.shipping shipping,qtd.deleted deleted,qtd.quote_name quote_name,qtd.config_notes config_notes," +
        //"qtd.special_notes special_notes,qtd.EA EA,qtd.CustPO CustPO,qtd.TBD_SHIP TBD_SHIP,qtd.rowOrder rowOrder," +
        //"esy.fullname salesperson' +
        //"ecp.profile_name profile_name,ecp.b_contact b_contact " +
        "FROM exxact.quote_data qtd " +
        "LEFT JOIN exxact.system_users esy ON(qtd.cust_id=esy.id) " +
        "LEFT JOIN exxact.customer_profiles ecp ON(qtd.cust_id=ecp.id) "
    def readQuotes = { sort, dir, search, start, limit ->

        def count = 0, data = [], where = ''
        def time = benchmark {
            if(search) {
                where = " WHERE qtd.qo_id LIKE '%${search}%' "
            }
            sql.eachRow(READ_QUOTES + " ${where} GROUP BY qtd.qo_id ORDER BY qtd.${sort} ${dir} ", start, limit) {
                data << [
                    id:           it.id,
                    qo_id:        it.qo_id,
                    date:         it.date,
                    fullname:     it.fullname,
                    profile_name: it.profile_name,
                    b_contact:    it.b_contact,
                    quote_name:   it.quote_name,
                    cost:         it.cost,
                    base_gp:      it.base_gp
                ]
            }
            count = sql.firstRow("SELECT FOUND_ROWS() cnt").cnt
            sql.close()
        }
        if(data) return [ success:true,  time:time, data: data, total:count ]
        else     return [ success:false, time:time, crud:'select custs', err:'some error.' ]
    }


/*Quote*/
    def final static READ_QUOTE =
        "SELECT SQL_CALC_FOUND_ROWS qtd.id id,qtd.qo_id qo_id " +
//        "SELECT SQL_CALC_FOUND_ROWS qtd.id id,qtd.qo_id qo_id,qtd.date date,esy.fullname fullname,ecp.profile_name profile_name," +
        //"ecp.b_contact b_contact,qtd.quote_name quote_name,qtd.cost cost " +
        //"SELECT SQL_CALC_FOUND_ROWS qtd.id id,qtd.qo_id qo_id,qtd.cid cid,qtd.part_id part_id,qtd.eta eta,qtd.cust_id cust_id," +
        //"qtd.sys_qty sys_qty,qtd.date date,qtd.dateStamp dateStamp,qtd.ship_method ship_method," +
        //"qtd.salesperson salesperson,qtd.sales_email sales_email,qtd.sales_phone sales_phone,qtd.base_gp base_gp," +
        //"qtd.option_gp option_gp,qtd.mfr_pn mfr_pn,qtd.part_desc part_desc,qtd.qty qty,qtd.cost cost," +
        //"qtd.shipping shipping,qtd.deleted deleted,qtd.quote_name quote_name,qtd.config_notes config_notes," +
        //"qtd.special_notes special_notes,qtd.EA EA,qtd.CustPO CustPO,qtd.TBD_SHIP TBD_SHIP,qtd.rowOrder rowOrder," +
        //"esy.fullname salesperson' +
        //"ecp.profile_name profile_name,ecp.b_contact b_contact " +
        "FROM exxact.quote_data qtd "
//        "LEFT JOIN exxact.system_users esy ON(qtd.cust_id=esy.id) " +
//        "LEFT JOIN exxact.customer_profiles ecp ON(qtd.cust_id=ecp.id) "
    def readQuote = { sort, dir, search, start, limit ->

        def count = 0, data = [], where = ''
        def time = benchmark {
            if(search) {
                where = " qtd.mfr_pn LIKE '%${search}%' "
            }
            sql.eachRow(READ_QUOTES + " ${where} WHERE qtd.qo_id= AND qtd.cat= ORDER BY qtd.${sort} ${dir} ", start, limit) {
                data << [
                    id:           it.id,
                    qo_id:        it.qo_id
/*                    date:         it.date,
                    fullname:     it.fullname,
                    profile_name: it.profile_name,
                    b_contact:    it.b_contact,
                    quote_name:   it.quote_name,
                    cost:         it.cost*/
                ]
            }
            count = sql.firstRow("SELECT FOUND_ROWS() cnt").cnt
            sql.close()
        }
        if(data) return [ success:true,  time:time, data: data, total:count ]
        else     return [ success:false, time:time, crud:'select custs', err:'some error.' ]
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
