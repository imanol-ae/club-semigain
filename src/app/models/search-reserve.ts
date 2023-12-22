export class SearchReserve{

    // Atributos
    public id: Number;
    //public NOMBRE : string;
    //public APELLIDOS: string;
    public fecha_reserva : Date;
    public hora_reserva: string;
    public tiene_luz: string;
    public user_id: number;
    public pista_id: number;
    public tipo_pista: string;
    public num_pista: number;
    


    // Contructor
    constructor( id: Number,fecha_reserva : Date, hora_reserva: string, tiene_luz : string, user_id: number, pista_id: number, tipo_pista: string, num_pista: number){
        this.id = id;
        this.fecha_reserva = fecha_reserva;
        this.hora_reserva = hora_reserva;
        this.tiene_luz = tiene_luz;
        this.user_id = user_id;
        this.pista_id = pista_id;
        this.tipo_pista= tipo_pista;
        this.num_pista = num_pista;

    }

    // Metodos

}