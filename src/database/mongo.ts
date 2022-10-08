import { connect } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();


export const mongoConnect = async () =>{
    try {
        console.log("Conectando ao Mongo...");
        await connect(process.env.Mongo_URL as string);
        console.log("MongoDB conectado com sucesso!");

    } catch (error) {
        console.log("Erro Conexão MongoDB:", error);
    }
}