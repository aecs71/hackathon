import React from 'react';
import { Container, Row, Col, Button,Dropdown } from 'react-bootstrap';
import ChallengeView from './components/challengeview';
import { useHistory } from 'react-router-dom'
import ChallengeStore from './ChallengeStore';
import './dashboard.css'
import { SORT } from './constants';

const Dashboard = () => {
    const history = useHistory();
    const handleChallengeClick = () => {
        history.push('/dashboard/new-challenge')
    }
    const [challenges, setChallenges] = React.useState(ChallengeStore.getAllChallenges());
    const [sortSelected,setSort]=React.useState('');
    const incrementUpvote = (e, id) => {
        const isVoteSuccess=ChallengeStore.addVote(id);
        if(isVoteSuccess){
            sortSelected?setChallenges(ChallengeStore.getSortedChallenges(sortSelected)):setChallenges(ChallengeStore.getAllChallenges()) 
        }
        else{
            alert('Sorry! Your vote is already recorded for this challenge, Please try with a new user')
        }
        
    }
    const handleLogout=()=>{
        localStorage.setItem('isLoggedin',"");
        history.push('/');
    }
    const sort=(type)=>{
        setSort(type);
        setChallenges(ChallengeStore.getSortedChallenges(type));
    }
    return (<Container className="pt-4">
        <Row>
            <Col md={6}>
                <Button onClick={handleChallengeClick} variant="success"><span className={'font-size-md'}><i className="bi bi-plus-lg"></i> New Challenge</span></Button>
            </Col>
            <Col md={6} className="d-flex">
                <Button className="ms-auto" onClick={handleLogout} variant="secondary"><span className={'font-size-md'}><i className="bi bi-chevron-left"></i> Logout</span></Button>
            </Col>
        </Row>
        <Row className="pt-4">
            <Col xs={6}>
                <h2>Challenges</h2>
            </Col>
            <Col xs={6}>
                <Dropdown className="d-flex">
                    <Dropdown.Toggle className="ms-auto sort-bg-color" variant="success" id="dropdown-basic">
                        <i className="bi bi-arrow-down-up"></i> <span >Sort By </span> 
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>sort(SORT.UPVOTE)} >Upvotes</Dropdown.Item>
                        <Dropdown.Item onClick={()=>sort(SORT.CREATED)}>Date Created</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </Col>
        </Row>
        <Row className="pt-4">

            <ChallengeView challenges={challenges} incrementUpvote={incrementUpvote} />

        </Row>
    </Container>)
}

export default Dashboard;