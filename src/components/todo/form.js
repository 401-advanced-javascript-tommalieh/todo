import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useForm from '../../hooks/use-form.js';
import { LoginContext } from '../../context/login-auth.js';
import LoginForm from './login-form.js';

function TodoForm(props) {
  const [item, handleInputChange, handleSubmit] = useForm(props);
  const loginContext = useContext(LoginContext);

  // useEffect(() =>{ 
  //   loginContext.user.capabilities.includes('create') ? console.log('hey') : console.log('hola');
  // },[LoginForm])

  return (
    <>
      
        <Form onSubmit={handleSubmit}>
          <Form.Group >
            <Form.Label><span>To Do Item</span>
              <input
                name="item"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group >
            <Form.Label>
              <span>Assigned To</span>
              <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
            </Form.Label>
          </Form.Group>
          <Form.Group >
            <Form.Label><span>Difficulty Rating</span>
              <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
            </Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Item
        </Button>

        </Form>

      

    </>
  );
       
}

export default TodoForm;
