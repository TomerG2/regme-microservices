var HOST = process.env.HOST || process.argv[2] || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[3] || '').split(',')
var SILENT = process.env.SILENT || process.argv[4] || 'true'


require('seneca')({
  tag: 'post',
  internal: {logger: require('seneca-demo-logger')},
  debug: { short_logs: true }
})
  //.use('zipkin-tracer', {sampling:1})
  .use('entity')
  .use('post-logic')

  .use('mesh',{
    pin: 'post:*',
    bases: BASES,
    host: HOST,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  })

  .ready(function(){
    console.log(this.id)
  })
