import UserStore from '../UserStore';
import { Storeage,SORT } from './constants';

class ChallengeStoreInternal {

    challenges(){
      return  localStorage.getItem(Storeage.CHALLENGES)?JSON.parse(localStorage.getItem(Storeage.CHALLENGES)):[];
    }
    addChallenge(challenge) {
        if (this.challenges()) {
            this.setChallengeToStorage([...this.challenges(), {...challenge,upvote:0,createdAt:Date.now()}]);
        }
        else {
            this.setChallengeToStorage([{...challenge,upvote:0,createdAt:Date.now()}])
        }
    }
    setChallengeToStorage(item){
        localStorage.setItem(Storeage.CHALLENGES,JSON.stringify(item))
    }
    sortBy = function(p) {
        return this.challenges().slice(0).sort(function(a,b) {
          return (a[p] > b[p]) ? -1 : (a[p] < b[p]) ? 1 : 0;
        });
      }
    getAllChallenges() {
        return this.challenges()?(this.challenges()):[];
    }
    getSortedChallenges(sortBy){
        if(sortBy===SORT.CREATED){
            return this.sortBy(SORT.CREATED)
        }
        else {
            return this.sortBy(SORT.UPVOTE)
        }
    }
    addVote(id){
        if(UserStore.getVotedChallenges().some((i)=>i==id)){
            return false;
        }
        const updatedChallenges= this.challenges().map(i=>{
            if(i.createdAt===id){
                return {...i,upvote:i.upvote+1}
            }
            return i;
        });
        UserStore.vote(id);
        this.setChallengeToStorage(updatedChallenges);
        return updatedChallenges;
    }
}
const ChallengeStore=new ChallengeStoreInternal();
export default ChallengeStore;