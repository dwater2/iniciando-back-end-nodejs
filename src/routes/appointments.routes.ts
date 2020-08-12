import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO} from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppontmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

/*
interface Appointment {
  id: string;
  provider: string;
  date: Date;
}
*/
// SoC: Separation of Conserns (Separação de preocupações)

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const createAppointment = new CreateAppontmentService();
  const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

  return response.json(appointment);

});


export default appointmentsRouter;