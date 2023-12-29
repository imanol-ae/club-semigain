export class ReservationModel {
  constructor(public id: number, public fecha_reserva: string, public hora_reserva: string, public tiene_luz: string, user_id: number) { }
}
