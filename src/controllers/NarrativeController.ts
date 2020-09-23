import { Request, Response } from 'express';
import db from '../database/connection';

class NarrativeController {

    /**LISTAR NARRATIVAS */
    async index(request: Request, response: Response){        

        const param = request.params;

        const id = param.id as string;

        var narratives;

        if (Number(id) > 0){
            narratives = await db('users')
            .where('narratives.id', id)
            .select(
                [
                    "narratives.id",
                    "narratives.name",
                    "narratives.description"
                ]
            );
        }else{
            narratives = await db('narratives')
            .select(
                [
                    "narratives.id",
                    "narratives.name",
                    "narratives.description",
                    "narratives.created_at",
                    "narratives.updated_at"
                ]
            ); 
        }

        const serializedNarratives = narratives.map(narrative => {
            return {
                id: narrative.id,
                name: narrative.name,
                desc: narrative.description,
                created_at: narrative.created_at,
                updated_at: narrative.updated_at
            }
        });

        return response.json(serializedNarratives);
    }

    /**CRIAR NOVA NARRATIVA */
    async create(request: Request, response: Response){        
        const {
            name,
            description
        } = request.body;        


        try {
            
            const insertedNarrative = await db('narratives').insert({
                name,
                description
            });

            /**Recuperando id do usuário recém inserido */
            const narrative_id = insertedNarrative[0];

            /**API aqui então, retorna mensagem de sucesso para o usuário */
            return response.status(201).send({
                id: narrative_id,
                name: name,
                description: description
            });
            
        } catch (error) {            
            return response.status(400).json({
                error: "Unexpected error while creating new narrative"
            });
        }
    }

}

export default NarrativeController;