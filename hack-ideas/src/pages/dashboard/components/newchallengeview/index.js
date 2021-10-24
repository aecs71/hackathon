import React from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import ChallengeStore from '../../ChallengeStore';
import './index.css'

const CreateChallenge = () => {
    const [formData, setFormData] = React.useState({});
    const [showToast,setToast]=React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        ChallengeStore.addChallenge(formData);
        setToast(true);
        setTimeout(()=>setToast(false),2000)

    }
    const handleChange = (e) => {
        const name = e.target.name;
        if(e.target.type!='checkbox'){
        setFormData({ ...formData, [name]: e.target.value });
        }
        else{
            const tags=formData[name]||[];
           const val= e.target.checked?[...tags,e.target.value]:tags.filter(i=>i!==e.target.value)
            setFormData({...formData,[name]:val})
        }
        
        
    }
    return <Container>
        <Row >
            <Col md={6} xs={12} className="pt-4 pos">
               { showToast && <div className="itoast">Challenge Created</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Hackathon Title</Form.Label>
                        <Form.Control name="title" onChange={handleChange} type="text" placeholder="Your Idea!" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="desc" onChange={handleChange} as="textarea" placeholder="A brief description" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tag">
                        <Form.Label>Select Tags</Form.Label>
                        <div className="mb-3">
                            <Form.Check
                                inline
                                label="Tech"
                                name="tags"
                                type={'checkbox'}
                                value="Tech"
                                id={`inline-checkbox-1`}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                label="Feature"
                                name="tags"
                                type={'checkbox'}
                                value="Feature"
                                id={`inline-checkbox-2`}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                label="Add On"
                                name="tags"
                                type={'checkbox'}
                                value="Add on"
                                id={`inline-checkbox-3`}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>
                    <Button className="mt-4" type="submit" variant="success">Create Challenge</Button>
                </Form>
            </Col>
        </Row>
    </Container>
}
export default CreateChallenge;