import {Request, Response} from 'express'

import Database from '../database/config';

class UsersController {
     async create(request: Request, response:Response) {
        const db = await Database();
        
        let loginId = '';

        for(let i=0;i<6;i++){
            loginId += Math.floor(Math.random()*10).toString();
        }

        const {
            username,
            phone: whatsapp,
            password
        } = request.body;

        await db.run(`INSERT INTO users (
            id,
            username,
            password,
            whatsapp
            ) VALUES (
            ${loginId},
            '${username}',
            '${password}',
            ${whatsapp})
        `);

        await db.close();

        // return response.status(201).send({username,whatsapp,password, loginId});
        return response.redirect(`/accountCreated/${loginId}`);
    }

    async listJobs(request:Request, response:Response){
        const db = await Database();
        const { loginCode: user_id,
                password 
        } = request.body;

        if(!user_id){
            return response.render('error', {message: 'Insira um nome de usuário'})
        }

        const userPassword = await db.get(`SELECT * FROM users WHERE id = ${user_id}`);
        let userJobs = {};

        if(!userPassword){
            return response.render('error', {message: 'Usuário não encontrado'});
        } else {
            if(userPassword.password == password){
                userJobs = await db.all(`SELECT * FROM jobs WHERE user_id = ${user_id}`);
                return response.render('seeJobs', {userJobs});
            } else {
                return response.render('error', {message: 'Senha incorreta. Tente novamente'});
            }
        }

    }
}

export default UsersController;