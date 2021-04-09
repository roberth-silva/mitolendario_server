import { Request, Response } from "express";
import db from "../database/connection";

class GameController {
  /**LISTAR GAMES */
  async index(request: Request, response: Response) {
    const param = request.params;

    const id = param.id as string;

    var games;

    if (Number(id) > 0) {
      games = await db("games")
        .where("games.id", id)
        .select(["games.id", "games.name"]);
    } else {
      games = await db("games").select([
        "games.id",
        "games.description",
        "games.narrative_id",
        "games.created_at",
        "games.updated_at",
      ]);
    }

    return response.json(games);
  }

  /**CRIAR NOVO GAME */
  async create(request: Request, response: Response) {
    const { description, narrative_id } = request.body;

    try {
      const insertedGame = await db("games").insert({
        description,
        narrative_id,
      });

      /**Recuperando id do game recém inserido */
      const game_id = insertedGame[0];

      /**API aqui então, retorna mensagem de sucesso para o usuário */
      return response.status(201).send({
        id: game_id,
        description: description,
        narrative_id: narrative_id,
      });
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        error: "Unexpected error while creating new game ",
      });
    }
  }
}

export default GameController;
