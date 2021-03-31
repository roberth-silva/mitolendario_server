import { Request, Response } from 'express';
import db from '../database/connection';


class AnswerController{
    async index(request: Request, response: Response){        

        const param = request.params;

        const id = param.id as string;

        var answers;

        if (Number(id) > 0){
            answers = await db('answers')
            .where('answers.question_id', id)
            .select(
                [
                    "answers.id",                    
                    "answers.description",
                    "answers.status",
                    "answers.question_id",                    
                    "answers.created_at",
                    "answers.updated_at"
                ]
            );
        }else{
            answers = await db('answers')
            .select(
                [
                    "answers.id",
                    "answers.description",
                    "answers.status",
                    "answers.question_id",
                    "answers.created_at",
                    "answers.updated_at"
                ]
            ); 
        }

        /*const serializedAnswers = answers.map(answer => {
            return {
                id: answer.id,                
                description: answer.description,
                status: answer.status,
                question_id: answer.game_id,
                created_at: answer.created_at,
                updated_at: answer.updated_at
            }
        });        */

        return response.json(answers);
    }
}

export default AnswerController;