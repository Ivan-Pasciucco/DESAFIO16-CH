const log4js = require('log4js')

log4js.configure({
    appenders:{
        logConsole: {type: 'console'},
        logWarn: {type: 'file', filename: 'warn.log'},
        logError: {type: 'file', filename: 'error.log'}
    },
    categories:{
        default: {appenders: ['logConsole'], level: 'trace'},
        consola: {appenders: ['logConsole'], level: 'info'},
        warn: {appenders: ['logWarn'], level: 'warn'},
        error: {appenders: ['logError'], level: 'error'}
    }
})

module.exports = log4js