
package org.exxact.service
import javax.servlet.ServletConfig
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import groovy.json.JsonSlurper

class Ajax extends HttpServlet {

    def sql

    def void init(ServletConfig config) {
	super.init(config)

        sql = new MySQL()
    }

    def void processRequest(request, response) {

        def json,
        search = legStr(request.getParameter('search'), ''),
        start  = legInt(request.getParameter('start'), 0),
        limit  = legInt(request.getParameter('limit'), 25)

        switch(request.getParameter('do')) {

            case 'login':
                json = sql.testLogin(request.getParameter('user'), request.getParameter('passwd'))
                break

            case 'users':
                def sort = request.getParameter('sort')
                def dir  = request.getParameter('dir')
                switch(request.getParameter('ex')) {
                    case 'read'   : json = sql.readUsers(sort, dir, search, start, limit); break
                    case 'create' : json = sql.createUsers(getJson(request)); break
                    case 'update' : json = sql.updateUsers(getJson(request)); break
                    case 'erase'  : json = sql.eraseUsers(); break
                }
                break

            default: json = "{success: false, msg:'Nothing do.'}"
        }

        response.setContentType("application/json;charset=UTF-8")
        def out = response.getWriter()
        out.print(json)
        out.close()
    }


    def private static legInt(value, deff) {

        def integer = deff
        try {
            integer = (int)Integer.parseInt(value)
        }
        catch(Exception ignore) {
            integer = 0
        }
        return integer as Integer
    }

    def private static legStr(value, deff)  { return value ? value as String : deff }

    def private static getJson(request)     { return new JsonSlurper().parse(request.getReader()) }

    def private static StringtoJson(str) {
        if(!str) return [] 
        def json
        try {
            json = JsonSlurper().parseText(str)
        }
        catch(Exception ignore) {
            json = []
        }
//        return new JsonSlurper().parseText(str)
    }

    def void doGet(HttpServletRequest request, HttpServletResponse response) {
        processRequest(request, response)
    }
    def void doPost(HttpServletRequest request, HttpServletResponse response) {
        processRequest(request, response)
    }
}

