export class NewReserve {

  // Atributos
  public user_id: Number;
  public fecha_reserva: String;
  public hora_reserva: String;
  public tiene_luz: String;
  public tipo_pista: String;
  public num_pista: String
  public pagado: String;



  // Contructor
  constructor(user_id: Number, fecha_reserva: string, hora_reserva: string, tiene_luz: String, tipo_pista: string, num_pista: string, pagado: String) {
    this.user_id = user_id;
    this.fecha_reserva = fecha_reserva;
    this.hora_reserva = hora_reserva;
    this.tiene_luz = tiene_luz;
    this.tipo_pista = tipo_pista;
    this.num_pista = num_pista;
    this.pagado = pagado;
    // Metodos
  }
}
