import React from 'react';
import Challenge from './components/Challenge'
const ChallengeView = (props) => {

    if(props.challenges.length<=0){
        return <div className="text-center"><h3>No challeges found. Please add a challenge</h3></div>
    }
    return <>
    {props?.challenges?.map((challenge,i)=><Challenge key={challenge.createdAt} {...challenge} incrementUpvote={props.incrementUpvote}/>)}
    </>
}
export default ChallengeView;