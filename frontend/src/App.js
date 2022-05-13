import {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import Pagination from './components/Pagination';
import axios from 'axios'



const App = () => {
  const baseurl = 'https://search-flask-react.herokuapp.com';

  const [data, setData] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");


  const searchHandler = (searchTerm, categoryTerm) => {
    setSearchTerm(searchTerm);
    setCategoryTerm(categoryTerm);


    console.log("hey : " , categoryTerm);
    if (searchTerm !== "" && categoryTerm !== "") {
      axios.get(`${baseurl}/search/${categoryTerm}/${searchTerm}`).then(
        res => res.data
      ).then(
        data => {
          const myObject = {
            ['rows']: data
          };
          setData(myObject)
          console.log(myObject)
        }
      );
    }


  };
  const pageHandler = (pageNo) => {
    console.log("page : " , pageNo);
    console.log("category term : " , categoryTerm);
    console.log("searchterm : " , searchTerm);
    pageNo -= 1;

    if (searchTerm !== "" && categoryTerm !== "") {
      axios.get(`${baseurl}/search/${categoryTerm}/${searchTerm}/${pageNo}`).then(
        res => res.data
      ).then(
        data => {
          const myObject = {
            ['rows']: data
          };
          setData(myObject)
          console.log(myObject)
        }
      );
    }


  };

  return (
    <div className="App">
      <header>
      <h3>
        Isynet Search 
      </h3>   
      </header>   

      <Form term={searchTerm} searchKeyword={searchHandler}/>
      
      <div className='container'>
      {(typeof data.rows === 'undefined') ? (
        <p>---</p>
      ):(

      <>
      <div className='row container' id='table_container'>
      <table className=" table  table-striped table-hover">
        <thead>
          <tr>
            <th className='custom_th' scope="col">#</th>
            <th className='custom_th' scope="col">Address</th>
            <th className='custom_th' scope="col">IndianCompany</th>
            <th className='custom_th' scope="col">Product</th>
          </tr>
        </thead>
        <tbody>
            {Object.keys(data.rows).map((innerAttr, index) => {

                  return (
                    <tr key={index}><th scope="row">{innerAttr}</th>
                    <td> {data.rows[innerAttr].Address1}</td>
                    <td> {data.rows[innerAttr].IndianCompany}</td>
                    <td> {data.rows[innerAttr].Product}</td></tr>
                      // <span key={index}> {innerAttr}:  {data.rows[innerAttr].Address1}<br/></span>
                  )})
              }
          
        </tbody>
      </table>
      </div>
      <Pagination pageInfo={pageHandler}/>
      
      </>
        
      )}
      </div>
  
    </div>
  );
}

export default App;
