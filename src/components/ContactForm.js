import React from 'react';
import { Form, Button } from 'react-bootstrap';

class ContactForm extends React.Component {
    render(){
        return (
            <form>
                <Form.Group controlId='contactFirstName'>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type='text' placeholder='First Name' name="firstName"/>
                </Form.Group>
                <Form.Group controlId='contactLastName'>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type='text' placeholder='Last Name' name="lastName"/>
                </Form.Group>
                <Form.Group controlId='contactCompany'>
                    <Form.Label>Company:</Form.Label>
                    <Form.Control type='text' placeholder='Company' name="company"/>
                </Form.Group>
                
            </form>
        )
    }
}

export default ContactForm;