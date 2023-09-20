import { Request, Response } from 'express';
import { FinishScheduleService } from '../../services/schedule/FinishScheduleService';

class FinishScheduleController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id;
    const schedule_id = request.query.schedule_id as string;

    const finishSchedule = new FinishScheduleService();

    const schedule = await finishSchedule.execute({ schedule_id, user_id });

    return response.json(schedule);
  }
}

export { FinishScheduleController };
