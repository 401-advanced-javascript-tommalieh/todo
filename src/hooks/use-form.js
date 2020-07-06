
import {useState} from 'react'

function useForm(props){
    const [item, setItem] = useState({});

  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value, status: false,  });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    const emptyItem = {};
    setItem(emptyItem);
}
return [item, handleInputChange, handleSubmit];
}

export default useForm;