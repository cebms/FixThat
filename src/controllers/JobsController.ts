import {Request, Response} from 'express';

import Database from '../database/config';

class JobsController {
    index(){}


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


        if(userPassword == undefined){
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
}

export default JobsController;