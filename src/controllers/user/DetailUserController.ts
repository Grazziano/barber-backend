import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id;

    console.log(user_id);

    const detailUserService = new DetailUserService();

    const detailUser = await detailUserService.execute();

    return response.json(detailUser);
  }
}

export { DetailUserController };
