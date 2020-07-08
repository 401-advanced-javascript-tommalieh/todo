import React, {useState, useContext} from 'react';
import { SettingsContext } from '../../context/settings.js';
import { LoginContext } from '../../context/login-auth.js';

import Pagination from './pagination.js';

function TodoList (props) {

  const siteContext = useContext(SettingsContext);
  const loginContext = useContext(LoginContext);

  function hideCheckedItem(){
    siteContext.changeDisplay(!siteContext.display);
    // console.log(siteContext.display);
    props.fetchPageItems();
  }

  function deleteItem(id){
    if(loginContext.user.capabilities.includes('delete')){
      props.deleteOnClick(id)
    }
    else{
      alert('Not Authorized');
    }
  }

  function toggleChecked(id){
    if(loginContext.user.capabilities.includes('update')){
      props.handleComplete(id)
    }
    else{
      alert('Not Authorized');
    }
  }
  return (
    <>
    <ul>
      {
      props.list.map(item => (
      siteContext.display === false ?
        item.status == 'false' ?
        <li
          className={`complete-${item.status}`}
          key={item._id}
        > 
          <span onClick={() => deleteItem(item._id)}>X</span>
          <span onClick={() => toggleChecked(item._id)}>
          Assignee: {item.assignee}
            <span>Task: {item.item}</span>
            <span>Difficulty: {item.difficulty}</span>
          </span>
        </li>
      :
      null
      :
      <li
          className={`complete-${item.status}`}
          key={item._id}
        > 
          <span onClick={() => deleteItem(item._id)}>X</span>
          <span onClick={() => toggleChecked(item._id)}>
          Assignee: {item.assignee}
            <span>Task: {item.item}</span>
            <span>Difficulty: {item.difficulty}</span>
          </span>
        </li>
      ))
      }
    </ul>
    <button onClick={hideCheckedItem}>{siteContext.display === false? "Show Checked" : "Hide Checked"}</button>
    <Pagination fetchPageItems={props.fetchPageItems} />
    </>
  );
}

export default TodoList;
