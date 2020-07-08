
import { useState, useContext } from 'react';
import { LoginContext } from '../context/login-auth.js'

function useForm(props) {
  const [item, setItem] = useState({});
  const loginContext = useContext(LoginContext);

  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value, status: false, });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log('use-form', loginContext.user.capabilities);
    if(loginContext.user.capabilities.includes('create')){
    props.handleSubmit(item);
    const emptyItem = {};
    setItem(emptyItem);
    }
    else{
      alert('Not Authorized');
    }
  }
  return [item, handleInputChange, handleSubmit];
}

export default useForm;