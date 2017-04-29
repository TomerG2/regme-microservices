var HOST = (process.env.HOST || '127.0.0.1')
var BASES = (process.env.BASES || '127.0.0.1:39000,127.0.0.1:39001')
var OPTS = (process.env.OPTS || '')

module.exports = {
  runDocker: false,
  tail: true,
  restartOnError: true,
  overrides: {
    base0: { 
      run: 'node base.js base0 39000 '+HOST+' '+BASES+' '+OPTS
    },
    base1: { 
      run: 'node base.js base1 39001 '+HOST+' '+BASES+' '+OPTS
    },
    api: { 
      run: 'node api-service.js 0 '+HOST+' '+BASES+' '+OPTS,
    },
    student: {
        run: 'node student-service.js '+HOST+' '+BASES+' '+OPTS,
    },
    post: {
      run: 'node post-service.js '+HOST+' '+BASES+' '+OPTS,
    },
    entry_store: {
      run: 'node entry-store-service.js '+HOST+' '+BASES+' '+OPTS,
    },
    front: { 
      run: 'node front.js '+HOST+' '+BASES+' '+OPTS,
    }
  }
};

