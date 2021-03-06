"use strict"

var PORT = process.env.PORT || process.argv[2] || 0
var HOST = process.env.HOST || process.argv[3] || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[4] || '').split(',')
var SILENT = process.env.SILENT || process.argv[5] || 'true'


var Hapi   = require('hapi')
var Chairo = require('chairo')
var Seneca = require('seneca')
var Rif    = require('rif')


var tag = 'api'

var server = new Hapi.Server()
var rif = Rif()


var host = rif(HOST) || HOST


server.connection({
    port: PORT,
    host: host
})


server.register({
  register: Chairo,
  options:{
    seneca: Seneca({
      tag: tag,
      internal: {logger: require('seneca-demo-logger')},
      debug: {short_logs:true}
    })
  }
})


server.register({
  register: require('wo'),
  options:{
    bases: BASES,
    route: [
        {path: '/api/ping'},
        {path: '/api/student', method: 'post'},
        {path: '/api/post/{user}', method: 'post'},
        {path: '/api/follow/{user}', method: 'post'},
    ],
    sneeze: {
      host: host,
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  }
})


server.route({
  method: 'GET', path: '/api/ping',
  handler: function( req, reply ){
    server.seneca.act(
      'role:api,cmd:ping',
      function(err,out) {
        reply(err||out)
      }
  )}
})

server.route({
    method: 'POST', path: '/api/student',
    handler: function( req, reply ){
        console.log('/api/student', req.params, req.payload)
        server.seneca.act(
            'student:entry',
            {student:req.payload},
            function(err,out) {
                console.log('/api/student', err, out)

                if( err ) return reply.redirect('/error')

                reply.redirect(req.payload.from)
            }
        )}
})


server.route({
    method: 'GET', path: '/admin',
    handler: {
        wo: {}
    }
})


server.seneca
  .add('role:api,cmd:ping', function(msg,done){
    done( null, {pong:true,api:true,time:Date.now()})
  })
    .use('mesh',{
	host: host,
	bases: BASES,
	sneeze: {
          silent: JSON.parse(SILENT),
          swim: {interval: 1111}
        }
    })


server.start(function(){
  console.log(tag,server.info.host,server.info.port)
})

