import {useState, useRef} from 'react';
import React from 'react'

const Form = (props) => {

    const categoryEl = useRef("");
    const [searchText, setSearchText] = useState("");

    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setSearchText(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.searchKeyword(searchText, categoryEl.current.value);
    }
    return (
        <form>
        <input 
            onChange={inputTextHandler} 
            type="text" 
            className="todo-input" 
        />
        <button onClick={submitForm} className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select  ref={categoryEl}  name="todos" className="filter-todo">
            <option value="product">Product</option>
            <option value="indiancompany">IndianCompany</option>
            <option value="address1">Address</option>
          </select>
        </div>
      </form>
    );
}

export default Form;