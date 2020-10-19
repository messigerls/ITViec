const defaultRouter = require('./defaultRouter')
const loginRouter = require('./loginRouter');
const registerRouter = require('./registerRouter')
module.exports = (app) => {
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/', defaultRouter)
}