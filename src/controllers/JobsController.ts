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
    }
}

export default JobsController;