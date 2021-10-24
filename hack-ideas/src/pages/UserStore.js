import { USER } from "./constants";

class UserStoreInternal {
    userData(){
       return  localStorage.getItem(USER.USERSTORE)?JSON.parse(localStorage.getItem(USER.USERSTORE)):[]
    }
    setUserData(data){
        localStorage.setItem(USER.USERSTORE,JSON.stringify(data));
    }
    addUser(id){
        if(!this.userData().some(i=>i.id == id)){
            this.setUserData([...this.userData(),new User(id)])
        }
    }
    vote(challengeId){
        const userId=localStorage.getItem(USER.ISLOGGEDIN);
        if(userId){
        const user=this.userData().map(i=>{
           if (i.id===userId){
               console.log(i)
               return {...i,voted:[...i.voted,challengeId]}
           }
           return i
        });
        this.setUserData(user);
        }
    }
    getVotedChallenges(){
        const userId=localStorage.getItem(USER.ISLOGGEDIN);
        return this.userData().find(i=>i.id==userId)?.voted;
    }
}
class User{
    constructor(id){
        this.id=id;
        this.voted=[];
    }
}
const UserStore=new UserStoreInternal();
export default UserStore;