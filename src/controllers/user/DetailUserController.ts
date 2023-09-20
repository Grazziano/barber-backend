import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
  async handle(request: Request, response: Response) {
    const detailUserService = new DetailUserService();

    const detailUser = await detailUserService.execute();

    return response.json(detailUser);
  }
}

export { DetailUserController };
