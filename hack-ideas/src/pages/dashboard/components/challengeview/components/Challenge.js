import React from 'react';
import { Card, Col } from 'react-bootstrap';
import './challenge.css'
const Challenge = ({ title, desc, tags, upvote, incrementUpvote, createdAt }) => {
  return <Col className={'mt-4'} xs={12} sm={6} md={4}><Card style={{ width: '18rem'}}>
    <Card.Body>
      <Card.Title className="color">{title}</Card.Title>

      <Card.Text className="color">
        {desc}
      </Card.Text>
      <div className="tag-c">
        {tags?.map((tag,i)=> <span key={i} className="tag">{tag}</span>)}
      </div>
     
      <Card.Text className="upvote" onClick={(e) => incrementUpvote(e, createdAt)}>
        <i className="bi bi-arrow-up-circle-fill" style={{ fontSize: '1.5rem' }} ></i>
        <span className="upvote-count">{upvote}</span>
      </Card.Text>
    </Card.Body>
  </Card></Col>
}
export default Challenge;