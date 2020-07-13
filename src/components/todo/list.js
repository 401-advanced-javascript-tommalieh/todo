import React from 'react';

function TodoList (props) {
  return (
    <ul>
      {props.list.map(item => (
        <li
          className={`complete-${item.status}`}
          key={item._id}
        > 
          <span onClick={() => props.deleteOnClick(item._id)}>X</span>
          <span onClick={() => props.handleComplete(item._id)}>
          Assignee: {item.assignee}
            <span>Task: {item.item}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
