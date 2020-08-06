/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import db from '../database/connection';

class ConnectionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const totalConnections = await db('connections').count('id as total');

    const { total } = totalConnections[0];

    return response.json({ total });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line camelcase
    const { user_id } = request.body;

    await db('connections').insert({
      user_id,
    });

    return response.status(201).send();
  }
}

export default new ConnectionsController();
