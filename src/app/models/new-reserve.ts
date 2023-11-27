export class NewReserve{

    // Atributos
    public ID_USUARIO: Number;
    public ID_RESERVA:Number;
    public FECHA_RESERVA: String;
    public HORA_RESERVA: String;
    public TIENE_LUZ : String;
    public ID_PISTA: Number;
    public PAGADO : String;



    // Contructor
    constructor(ID_USUARIO: Number, ID_RESERVA:Number, FECHA_RESERVA:string, TIENE_LUZ : String, ID_PISTA: Number, PAGADO:String ){
        this.ID_USUARIO = ID_USUARIO;
        this.ID_RESERVA = ID_RESERVA;
        this.FECHA_RESERVA = FECHA_RESERVA;
        this.TIENE_LUZ=TIENE_LUZ;
        this.ID_PISTA = ID_PISTA;
        this.PAGADO=PAGADO;
    // Metodos
    }
}