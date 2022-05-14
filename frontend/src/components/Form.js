import {useState, useRef} from 'react';
import React from 'react'

const Form = (props) => {

  const categoryRef1 = useRef("");
  const categoryRef2 = useRef("");
  const categoryRef3 = useRef("");
  const categoryRef4 = useRef("");

  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [searchText3, setSearchText3] = useState("");
  const [searchText4, setSearchText4] = useState("");

  const inputTextHandler1 = (e) => {
      setSearchText1(e.target.value);
  }
  const inputTextHandler2 = (e) => {
    setSearchText2(e.target.value);
  }
  const inputTextHandler3 = (e) => {
    setSearchText3(e.target.value);
  }
  const inputTextHandler4 = (e) => {
    setSearchText4(e.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    // search terms entered by user
    var terms_ = [searchText1,searchText2,searchText3,searchText4]

    // selected categories
    var cats_ = [categoryRef1.current.value,
                categoryRef2.current.value,
                categoryRef3.current.value,
                categoryRef4.current.value,]

    var cats = []
    var terms = []

    // removing empty fields before submiting
    for (var x=0; x < 4; x += 1){
      if (terms_[x] != '') {
        cats.push(cats_[x]);
        terms.push(terms_[x]);
      }
    }

    // sending form data to App.js to be sent over to backend
    props.searchKeyword(terms, cats);
  }
  return (
  <div className="container">

  <div className="container">
    <div className="row">
      <div className="col-6">
        <form>
          <input 
            onChange={inputTextHandler1} 
            type="text" 
            className="todo-input " 
          />
          <button onClick={submitForm} className="todo-button" type="submit">
            <i className="fas fa-search"></i>
          </button>
          <div className="select">
            <select  ref={categoryRef1}  name="todos" className="filter-todo">
              <option value="product">Product</option>
              <option value="indiancompany">IndianCompany</option>
              <option value="foreigncountry">ForeignCountry</option>
              <option value="address1">Address</option>
              <option value="billno">Bill No</option>
            </select>
          </div>
        </form>

      </div>
        <div className="col-6">
          <form>
            <>
            <input 
              onChange={inputTextHandler2} 
              type="text" 
              className="todo-input " 
            />
            <button onClick={submitForm} className="todo-button" type="submit">
              <i className="fas fa-search"></i>
            </button>
            <div className="select">
              <select  ref={categoryRef2}  name="todos" className="filter-todo">
                <option value="product">Product</option>
                <option value="indiancompany">IndianCompany</option>
                <option value="foreigncountry">ForeignCountry</option>
                <option value="address1">Address</option>
                <option value="billno">Bill No</option>
              </select>
            </div>
            </>
          </form>
        </div>
        <div className="col-6">
          <form>
            <>
            <input 
              onChange={inputTextHandler3} 
              type="text" 
              className="todo-input" 
            />
            <button onClick={submitForm} className="todo-button" type="submit">
              <i className="fas fa-search"></i>
            </button>
            <div className="select">
              <select  ref={categoryRef3}  name="todos" className="filter-todo">
                <option value="product">Product</option>
                <option value="indiancompany">IndianCompany</option>
                <option value="foreigncountry">ForeignCountry</option>
                <option value="address1">Address</option>
                <option value="billno">Bill No</option>
              </select>
            </div>
            </>
          </form>
        </div>
        <div className="col-6">
          <form>
            <>
            <input 
              onChange={inputTextHandler4} 
              type="text" 
              className="todo-input " 
            />
            <button onClick={submitForm} className="todo-button" type="submit">
              <i className="fas fa-search"></i>
            </button>
            <div className="select">
              <select  ref={categoryRef4}  name="todos" className="filter-todo">
                <option value="product">Product</option>
                <option value="indiancompany">IndianCompany</option>
                <option value="foreigncountry">ForeignCountry</option>
                <option value="address1">Address</option>
                <option value="billno">Bill No</option>
              </select>
            </div>
            </>
          </form>
        </div>

        <div className='col-4'></div>
        <div className='col-4 text-center'>
          <button id='main_search_btn' onClick={submitForm} className="btn " type="submit">
          Search  <i className="fas fa-search"></i>
          </button>
        </div>
        <div className='col-4'></div>
    </div>
    </div>

    </div>
  );
}

export default Form;