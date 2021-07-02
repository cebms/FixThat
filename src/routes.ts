import express from 'express'
import UsersController from './controllers/UsersController';
import JobsController from './controllers/JobsController';

const usersController = new UsersController();
const jobsController = new JobsController();

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.render('home');
});

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
    return response.render('seeJobs');
})

routes.post('/users', usersController.create);
routes.post('/jobs', jobsController.create);

export default routes;