import { Request, Response } from 'express';
import db from '../database/connection';
import crypto from 'crypto';

class UserTypeController{
    
    /**LISTAR USUÁRIOS */
    async index(request: Request, response: Response){        

        const param = request.params;

        const id = param.id as string;

        var users;

        if (Number(id) > 0){
            users = await db('users')
            .where('users.id', id)
            .select(
                [
                    "users.id",
                    "users.login",
                    "users.pass",
                    "users.status",
                    "users.created_at",
                    "users.updated_at"
                ]
            );
        }else{
            users = await db('users')
            .select(
                [
                    "users.id",
                    "users.login",
                    "users.pass",
                    "users.status",
                    "users.created_at",
                    "users.updated_at"
                ]
            ); 
        }

        /*const serializedUsers = users.map(user => {
            return {
                id: user.id,
                login: user.login,
                pass: user.pass,
                status: user.status,
                created_at: user.created_at,
                updated_at: user.updated_at
            }
        });*/

        return response.json(users);
    }

    async logon(request: Request, response: Response){

        const {
            login,
            pass
        } = request.body;

        const hashPass = crypto.createHmac('sha512', pass);
        const newPass = hashPass.digest('hex');

        const users = await db('users')
        .where({
            login: login,
            pass: newPass,
            status: 'ATIVO'
          }).select('users.id','users.login','users.status');

          /*const serializedUser = users.map(user => {
            return {
                id: user.id,
                login: user.login,
                status: user.status
            }
        });*/

        return response.json(users); 

    }

    /**CRIAR NOVO USUÁRIO */
    async create(request: Request, response: Response){        
        const {
            login,
            pass,
            status
        } = request.body;        
        
        const hashPass = crypto.createHmac('sha512', pass);
        const newPass = hashPass.digest('hex');

        try {
            
            const insertedUserIds = await db('users').insert({
                login,
                pass: newPass,
                status
            });           

            /**Recuperando id do usuário recém inserido */
            const user_id = insertedUserIds[0];

            /**API aqui então, retorna mensagem de sucesso para o usuário */
            return response.status(201).send({
                id: user_id,
                login: login,
                pass: pass,
                status: status            
            });
            
        } catch (error) {            
            return response.status(400).json({
                error: "Unexpected error while creating new user"
            });
        }
    }

    /**Atualizar usuario */
    async edit(request: Request, response: Response){

        const {
            id,
            login,
            status
        } = request.body;

        console.log(id, login, status);

        try {
            const rowsAffected = await db('users')
            .where('users.id', id )
            .update({ 
                login, 
                status
            });

        /**API aqui então, retorna mensagem de sucesso para o usuário */
        return response.status(200).send();
            
        } catch (error) {
            /**Se algum erro acontecer no meio do caminho retorna mensagem de Bad Request */            
            return response.status(400).json({
                error: "Unexpected error while editing user"
            });
        }         
    }

    /**EXCLUIR usuario */
    async delete(request: Request, response: Response){
        const param = request.params;

        const id = param.id as string;        

        try {
            
            const rowsAffected = await db('users')
            .where('users.id', id)
            .del();

            /**API aqui então, retorna mensagem de sucesso para o usuário */
            return response.status(200).send(rowsAffected);
            
        } catch (error) {
            /**Se algum erro acontecer no meio do caminho retorna mensagem de Bad Request */            
            return response.status(400).json({
                error: "Unexpected error while deleting user"
            });
        }
     }
    
}

export default UserTypeController;