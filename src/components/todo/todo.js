import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

function ToDo(props) {
  const [list, setList] = useState([]);
  const [item, setItem] = useState({});
  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = id => {
    const item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      setItem(item);
    }
  };

  useEffect(() => {

    let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
    setList(newList);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    let list = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ];

    setList(list);
  }, []);

  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Nav className="mr-auto">
            <h2>
              There are {list.filter(item => !item.complete).length} Items To Complete
            </h2>
          </Nav>
        </Navbar>

      </header>

      <section className="todo">

        <div>
          <TodoForm/>
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
          />
        </div>
      </section>
    </>
  );
}

export default ToDo;
