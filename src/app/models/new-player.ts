export class NewPlayer{

    // Atributos
    public id: Number;
    public name : string;
    public apellidos: string;
    public fecha_nacimiento : string;
    public sexo: string;
    public direccion_postal: string;
    public municipio: string;
    public provincia: string;
    public imagen_perfil : string;
    public email: string;
    public numero_socio: string;
    public fecha_alta: string;
    public fecha_baja: string;
    public es_admin: string;
    public password: string;


    // Contructor
    constructor( id: Number,name : string, apellidos: string, fecha_nacimiento : string, sexo: string, direccion_postal: string, municipio: string, provincia: string, imagen_perfil : string,email: string, numero_socio:string,fecha_alta: string, fecha_baja: string, es_admin: string, password:string){
        this.id = id;
        this.name = name;
        this.apellidos = apellidos;
        this.fecha_nacimiento = fecha_nacimiento;
        this.sexo = sexo;
        this.direccion_postal = direccion_postal;
        this.municipio= municipio;
        this.provincia = provincia;
        this.imagen_perfil = imagen_perfil;
        this.email = email;
        this.numero_socio = numero_socio;
        this.fecha_alta = fecha_alta;
        this.fecha_baja = fecha_baja;
        this.es_admin = es_admin;
        this.password = password;
    }

    // Metodos

}