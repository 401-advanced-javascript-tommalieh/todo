import React, { useEffect, useState, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { SettingsContext } from '../../context/settings.js';

import './todo.scss';
import useAjax from '../../hooks/use-ajax.js';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);
  const siteContext = useContext(SettingsContext)
  const _addItem = (item) => {
    console.log('hey')
    item.due = new Date();
    console.log(item);
    // console.log(item.difficulty);
    // console.log(Number(item.difficulty));
    useAjax(todoAPI, 'post', item)
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    const itemStatus = JSON.parse(item.status);
    item.status = !(itemStatus);

    let url = `${todoAPI}/${id}`;
    useAjax(url, 'put', item, item._id)
      .then(response => response.json())
      .then(savedItem => {
        console.log(savedItem.status)
        setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
      })
      .catch(console.error);
  };

  const _deleteTodoItem = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    let url = `${todoAPI}/${id}`;
    useAjax(url, 'delete', item, item._id)
      .then(response => response.json())
      .then(savedItem => {
        _getTodoItems();
      })
      .catch(console.error);
  };

  const _getTodoItems = () => {
    useAjax(todoAPI, 'get')
      .then(data => data.json())
      .then(data => {
        data.results.map(item => {
          item.complete = false;
        })

        setList(data.results);
        // setList(sortedList);

      })
      .catch(console.error);
  };

  const indexOfLastItem = siteContext.currentPage * siteContext.itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - siteContext.itemsPerPage;

  list.sort((a, b) => {
    return Number(a.difficulty) - Number(b.difficulty);
  });
  

  const currentPagePosts = list.slice(indexOfFirstItem, indexOfLastItem);

  const numberOfPages = (list.length) / (siteContext.itemsPerPage);

  siteContext.changeNumberOfPages(numberOfPages);


  useEffect(_getTodoItems, []);

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
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={currentPagePosts}
            handleComplete={_toggleComplete}
            deleteOnClick={_deleteTodoItem}
            fetchPageItems={_getTodoItems}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
