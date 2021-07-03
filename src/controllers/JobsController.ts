import {Request, Response} from 'express';

import Database from '../database/config';

class JobsController {
    async index(request:Request, response:Response){
        const db = await Database();

        const jobs = await db.all(`SELECT
            jobs.title,
            jobs.description,
            jobs.area,
            users.username,
            users.whatsapp
            FROM jobs LEFT JOIN users on jobs.user_id = users.id`);

        response.render('home', {jobs});
    }


    async create(request:Request, response:Response){
        const db = await Database();

        const {
            loginCode: user_id,
            password,
            jobTitle: title,
            jobDescription: description,
            jobArea: area,
        } = request.body;


        const userPassword = await db.get(`SELECT * FROM users WHERE id = ${user_id}`);


        if(!userPassword){
            return response.render('error', {message: 'Usuário não encontrado'});
        } else {
            if(userPassword.password == password){
                await db.run(`INSERT INTO jobs (
                    title,
                    description,
                    user_id,
                    area
                    ) VALUES (
                        '${title}',
                        '${description}',
                        ${user_id},
                        '${area}'
                    )
                `);

                await db.close();

                return response.redirect('/');
            } else {
                return response.render('error', {message: 'Senha incorreta. Tente novamente'});
            }
        }
              
    }

    async delete(request:Request, response:Response){
        const db = await Database();
        const {job_id, user_id} = request.params;

        await db.run(`DELETE FROM jobs WHERE id = ${job_id}`);

        const userJobs = await db.all(`SELECT id, title, description, area FROM jobs WHERE user_id = ${user_id}`);
        return response.render('seeJobs', {userJobs});
    }
}

export default JobsController;