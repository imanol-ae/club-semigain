export class LookReserve{

    // Atributos
    public ID_RESERVA: Number;
    //public NOMBRE : string;
    //public APELLIDOS: string;
    public FECHA_RESERVA : string;
    public HORA_RESERVA: string;
    public TIENE_LUZ: string;
    public ID_USUARIO: number;
    public ID_PISTA: number;
    public TIPO_PISTA: string;
    public NUM_PISTA: number;
    


    // Contructor
    constructor( ID_RESERVA: Number,FECHA_RESERVA : string, HORA_RESERVA: string, TIENE_LUZ : string, ID_USUARIO: number, ID_PISTA: number, TIPO_PISTA: string, NUM_PISTA: number){
        this.ID_RESERVA = ID_RESERVA;
        this.FECHA_RESERVA = FECHA_RESERVA;
        this.HORA_RESERVA = HORA_RESERVA;
        this.TIENE_LUZ = TIENE_LUZ;
        this.ID_USUARIO = ID_USUARIO;
        this.ID_PISTA = ID_PISTA;
        this.TIPO_PISTA= TIPO_PISTA;
        this.NUM_PISTA = NUM_PISTA;

    }

    // Metodos

}