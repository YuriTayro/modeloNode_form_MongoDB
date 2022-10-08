import { Request, Response } from 'express';
import Members from '../models/Members';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;

    res.render('pages/nome', {
        nome,
       
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const addUserAction = async (req: Request, res: Response) => {
    let { firstName, lastName, email, age, interests } = req.body;

    let newMember = new Members();

    newMember.name = { 
        firstName, 
        lastName 
    },
    newMember.email = email,
    newMember.age = parseInt(age);
    newMember.interests = interests.split(',');

    try {
        await newMember.save();
        console.log("Usuario inserido com sucesso!");
    } catch(error) {
        console.log("Erro ao inserir usuario: ", error);
    }

    res.redirect('/');
}

export const incrementAgeAction = async (req: Request, res: Response) => {
    try{
        let id:string = req.params.id; //rota dinâmica
        //console.log("Id: ", id);
        let usuario = await Members.findById({_id: id});
        //console.log("Usuario com o id: ", usuario)
        if(usuario){
            usuario.age++;
            await usuario.save()
            console.log("Idade de usuário alterado:", usuario.name.firstName, usuario.name.lastName);
        }
    }catch(error){
            console.log("Erro na alteração!:", error);
    }
    
    res.redirect('/');
}


