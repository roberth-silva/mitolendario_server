import { Request, Response } from 'express';
import db from '../database/connection';

interface answerItem {
    description: string;
    status: string;
    question_id: number;
    created_at: Date;
    updated_at: Date;
}

class QuestionsController {
  /**LIST QUESTIONS */
  async index(request: Request, response: Response) {
    const param = request.params;

    const id = param.id as string;

    var questions;

    if (Number(id) > 0) {
      questions = await db("questions")
        .where("questions.id", id)
        .select([
          "questions.id",
          "questions.description",
          "questions.status",
          "questions.game_id",
        ]);
    } else {
      questions = await db("questions").select([
        "questions.id",
        "questions.description",
        "questions.status",
        "questions.game_id",
        "questions.created_at",
        "questions.updated_at",
      ]);
    }

    /*const serializedQuestions = questions.map(question => {
            return {
                id: question.id,                
                description: question.description,
                status: question.status,
                game_id: question.game_id,
                created_at: question.created_at,
                updated_at: question.updated_at
            }
        });*/

    return response.json(questions);
  }

  async getPerGameId(request: Request, response: Response) {
    const { game_id } = request.body;

    const questions = await db("questions")
      .where("questions.game_id", game_id)
      .select([
        "questions.id",
        "questions.description",
        "questions.status",
        "questions.game_id",
      ]);

    /*const serializedQuestions = questions.map(question => {
            return {
                id: question.id,                
                description: question.decscription,
                status: question.status,
                game_id: question.game_id,
                created_at: question.created_at,
                updated_at: question.updated_at
            }
        });*/

    return response.json(questions);
  }

  /**DELETE A QUESTION */
  async delete(request: Request, response: Response) {
    
    console.log('deleting...');
    
    const param = request.params;
    const id = param.id as string;

    const trx = await db.transaction();

    console.log('id',id);

    try {
      await trx("answers").where("answers.question_id", id).del();
      await trx("questions").where("questions.id", id).del();

      await trx.commit();
      
    } catch (error) {
        console.log('error deleting: ', error);
      await trx.rollback();
      return response.status(400).json({
        error: "Unexpected error while deleting a question",
      });
    }
  }

  /**CREATE A NEW QUESTION */
  async create(request: Request, response: Response) {
    const {
      description,
      status,
      game_id,
      created_at,
      updated_at,
      answers,
    } = request.body;

    console.log(description, status, game_id, created_at, updated_at, answers);

    const trx = await db.transaction();
    var question_id = 0;

    try {
      await trx("questions")
        .insert({
          description,
          status,
          game_id,
          created_at,
          updated_at,
        })
        .returning("id")
        .then(function (result) {
          console.log("result", result);
          question_id = result[0];
        });

      // Como o objeto asnwers é um array de vários dados, antes de inserir precisamos fazer algumas configurações.
      // Com a função map() vamos percorrer cada item do array e transformá-los em um objeto.
      const classAnswer = answers.map((answerItem: answerItem) => {
        return {
          description: answerItem.description,
          status: answerItem.status,
          question_id: question_id,
          created_at: new Date().toUTCString(),
          updated_at: new Date().toUTCString(),
        };
      });

      // Agora sim podemos inserir o objeto 'classAnswer' na tabela 'answers'
      await trx("answers").insert(classAnswer);

      // Como estamos usando o transaction, todas as querys estão apenas esperando o commit para realmente rodarem.
      // Com todas as inserções preparadas, podemos fazer o commit() que faz as inserções nas tabelas.
      await trx.commit();

      /**API aqui então, retorna mensagem de sucesso para o usuário */
      return response.status(201).send({
        id: question_id,
        description: description,
        status: status,
        game_id: game_id,
        created_at: created_at,
        updated_at: updated_at,
        answers: answers,
      });
    } catch (error) {
      console.log("nao inseriu");
      console.log(error);
      // desfaz qualquer alteração no banco
      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while creating new question",
      });
    }
  }
}

export default QuestionsController;