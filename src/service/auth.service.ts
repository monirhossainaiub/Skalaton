import { IUser } from '../model/user.model';
import UserRepository from '../repository/user.repository';

class AuthService {
    static authService: AuthService;
    userRepository: UserRepository = UserRepository.getInstance();
    private constructor(){}

    public static getInstance(){
        if(!this.authService){
            this.authService = new AuthService();
        }
        return this.authService;
    }

    public async signInUser(user: IUser): Promise<IUser | any> {
        try {
            let result = await this.userRepository.getUser(user);
            console.log('service user', result)
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async createUser(user: IUser): Promise<IUser> {
        try {
            return await this.userRepository.createUser(user);
        } catch (error) {
            throw error;
        }
    }

    public async forgotPassword(email: string): Promise<any> {
        try {
            let result = await this.userRepository.forgotPassword(email);
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async getUserByToken(token: string): Promise<IUser> {
        try {
            return await this.userRepository.getUserByToken(token);
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(user: IUser): Promise<IUser> {
        try {
            return await this.userRepository.updateUser(user);
        } catch (error) {
            throw error;
        }
    }

    public async updatePassword(user:any, currentPassword:string, toChangePassword:string): Promise<boolean>{
        try {
            return await this.userRepository.updatePassword(user, currentPassword, toChangePassword);
        } catch (error) {
            throw error;
        }
    }
    
    public async updateMe(user:any): Promise<any>{
        try {
            return await this.userRepository.updateMe(user);
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;