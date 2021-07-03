import express from 'express'
import UsersController from './controllers/UsersController';
import JobsController from './controllers/JobsController';

const usersController = new UsersController();
const jobsController = new JobsController();

const routes = express.Router();

routes.get('/', jobsController.index);

routes.get('/createAccount', (request, response) => {
    return response.render('createAccount');
});

routes.get('/createJob', (request, response) => {
    return response.render('createJob');
});

routes.get('/accountCreated/:loginCode', (request,response) => {
    const {loginCode} = request.params;
    return response.render('accountCreated', {loginCode});
});

routes.get('/seeJobs', (request, response) => {
    return response.render('seeJobs', {userJobs: []});
})

routes.post('/myJobs', usersController.listJobs);
routes.post('/deleteJob/:user_id/:job_id', jobsController.delete);
routes.post('/users', usersController.create);
routes.post('/jobs', jobsController.create);

export default routes;