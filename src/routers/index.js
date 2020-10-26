const defaultRouter = require('./defaultRouter')
const loginRouter = require('./loginRouter');
const registerRouter = require('./registerRouter')
const jobListRouter = require('./jobListRouter');
const profileRouter = require('./profileRouter')
const companyRouter = require('./companyRouter')
const uploadRouter = require('./uploadRouter');

module.exports = (app) => {
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/job-list', jobListRouter)
    app.use('/profile', profileRouter)
    app.use('/company', companyRouter)
    app.use('/upload', uploadRouter)
    app.use('/', defaultRouter)
}