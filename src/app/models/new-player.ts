export class NewPlayer{

    // Atributos
    public ID_USUARIO: Number;
    public NOMBRE : string;
    public APELLIDOS: string;
    public FECHA_NACIMIENTO : string;
    public SEXO: string;
    public DIRECCION_POSTAL: string;
    public MUNICIPIO: string;
    public PROVINCIA: string;
    public IMAGEN_PERFIL : string;
    public EMAIL: string;
    public NUMERO_SOCIO: string;
    public FECHA_ALTA: string;
    public FECHA_BAJA: string;
    public ES_ADMIN: boolean;
    public PASS: string;


    // Contructor
    constructor( ID_USUARIO: Number,NOMBRE : string, APELLIDOS: string, FECHA_NACIMIENTO : string, SEXO: string, DIRECCION_POSTAL: string, MUNICIPIO: string, PROVINCIA: string, IMAGEN_PERFIL : string,EMAIL: string, NUMERO_SOCIO:string,FECHA_ALTA: string, FECHA_BAJA: string, ES_ADMIN: boolean, PASS:string){
        this.ID_USUARIO = ID_USUARIO;
        this.NOMBRE = NOMBRE;
        this.APELLIDOS = APELLIDOS;
        this.FECHA_NACIMIENTO = FECHA_NACIMIENTO;
        this.SEXO = SEXO;
        this.DIRECCION_POSTAL = DIRECCION_POSTAL;
        this.MUNICIPIO= MUNICIPIO;
        this.PROVINCIA = PROVINCIA;
        this.IMAGEN_PERFIL = IMAGEN_PERFIL;
        this.EMAIL = EMAIL;
        this.NUMERO_SOCIO = NUMERO_SOCIO;
        this.FECHA_ALTA = FECHA_ALTA;
        this.FECHA_BAJA = FECHA_BAJA;
        this.ES_ADMIN = ES_ADMIN;
        this.PASS = PASS;
    }

    // Metodos

}