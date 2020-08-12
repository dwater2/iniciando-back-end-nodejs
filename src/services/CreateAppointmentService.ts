import { startOfHour} from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppontmentService {

  public async execute({ provider_id, date }: Request): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);//Agendamento de hora em hora

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
      throw new AppError('This appointmment is already booked', 400);
    }

    const appointment = appointmentsRepository.create({
      provider_id: provider_id,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);
    return appointment
  }
}

export default CreateAppontmentService;
