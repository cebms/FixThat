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
}

export default UsersController