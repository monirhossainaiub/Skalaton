export class UserSignupDto{
    id: number;
    firstname: string;
    lastname: string;
    username: string;

    constructor(){
        this.id = 0;
        this.firstname = '';
        this.lastname = '';
        this.username = '';
    }
}