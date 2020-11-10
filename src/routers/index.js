const defaultRouter = require('./defaultRouter')
const loginRouter = require('./loginRouter');
const registerRouter = require('./registerRouter')
const jobListRouter = require('./jobListRouter');
const profileRouter = require('./profileRouter')
const companyRouter = require('./companyRouter')
const uploadRouter = require('./uploadRouter');
const myJobRouter = require('./myJobRouter')
const apiRouter = require('./apiRouter')
const jobRouter = require('../routers/jobRouter')
const applyJobRouter = require('./applyJobRouter')
const applyCandidateRouter = require('./applyCandidateRouter');
const {authUser} = require('../middleware/authentication')

module.exports = (app) => {
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/job-list', jobListRouter)
    app.use('/profile', profileRouter)
    app.use('/company', companyRouter)
    app.use('/upload', uploadRouter)
    app.use('/my-job', myJobRouter)
    app.use('/api', apiRouter)
    app.use('/job', jobRouter)
    app.use('/apply-job', applyJobRouter)
    app.use('/apply-candidate', applyCandidateRouter)
    app.use('/', defaultRouter)
}