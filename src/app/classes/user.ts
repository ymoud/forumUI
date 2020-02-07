export interface IUser{
    name:string;
    surname:String;
    age:number;
    id:string;
}

export class User implements IUser{
    public name:string;
    public surname:String;
    public age:number;
    public id:string;
}
