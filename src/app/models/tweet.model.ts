
import { User } from "./user.model";

export class Tweets {
    id : number = 0
    tweet : string = '';
    liked : boolean = false;
    user_id : number =0;

    User: any[] = [];
    users:  User= new User;
}
