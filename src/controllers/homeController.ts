import { Request, Response } from 'express';

import Members from '../models/Members';

export const home = async (req: Request, res: Response)=>{
    let members = await Members.find({}).sort({"name.firstName": 1});

    res.render('pages/home', {
        members
    });
};