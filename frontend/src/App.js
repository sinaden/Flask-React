import {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import Pagination from './components/Pagination';
import axios from 'axios'


// Main component of the application, handles sending backend api requests (Search Queries)
const App = () => {
  const baseurl = 'https://search-flask-react.herokuapp.com';
  const appTitle = 'Isynet Search';


  const [data, setData] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const [terms, setTerms] = useState([]);
  const [categories, setCategories] = useState([]);

  // searching based on multiple parameter (The main search used in website), called via searchKeyword
  const advancedSearchHandler = (terms, cats) => {
    setTerms(terms);
    setCategories(cats);

    var terms_json = JSON.stringify(Object.assign({}, terms))
    var cats_json = JSON.stringify(Object.assign({}, cats))

    const options = {
      url: `${baseurl}/usearch`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        cols:cats_json,
        terms:terms_json,
        pagination: "0"
      }
    };
    axios(options)
      .then(response => {
        const myObject = {
                  ['rows']: response.data
                };
        setData(myObject)
      });
  };

  // viewing search with pagination (called when used clicks on page numbers)
  const pageHandler = (pageNo) => {
    pageNo -= 1;

    if (terms != [] && categories != []) {
      var terms_json = JSON.stringify(Object.assign({}, terms))
      var cats_json = JSON.stringify(Object.assign({}, categories))

      const options = {
        url: `${baseurl}/usearch`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          cols:cats_json,
          terms:terms_json,
          pagination: pageNo
        }
      };
      axios(options)
        .then(response => {
          const myObject = {
                    ['rows']: response.data
                  };
          setData(myObject)
        });
    }
  };

  // This hook will run only at the begining of the component life cycle, filling the initial table with all the values. 
  // (Since no search queries are called when we first run the application)
  useEffect(() => {
    document.title = appTitle;

    const options = {
      url: `${baseurl}/all`,
      method: 'GET'
    };
    axios(options)
      .then(response => {
        const myObject = {
                  ['rows']: response.data
                };
        setData(myObject)
      });
  },[]);  

  return (
    <div className="App">
      <header>
      <h3>
        {appTitle}
      </h3>
      </header>   

      {/* Search form component */}

      <Form searchKeyword={advancedSearchHandler}/>

      {/* Pagination component */}

      <Pagination pageInfo={pageHandler}/>

      {/* The structure of the table which shows the result */}

      <div className='container'>
      {(typeof data.rows === 'undefined' || Object.keys(data.rows).length == 0) ? (
        <></>
      ):(
        
      

      <>
      <div className='row' id='table_container'>
      <table className=" table  table-striped table-hover">
        <thead>
          <tr>
            <th className='custom_th' scope="col">BillNo</th>
            <th className='custom_th' scope="col">Address</th>
            <th className='custom_th' scope="col">IndianCompany</th>
            <th className='custom_th' scope="col">Product</th>
            <th className='custom_th' scope="col">ForeignCountry</th>

          </tr>
        </thead>
        <tbody>
            {Object.keys(data.rows).map((innerAttr, index) => {

                  return (
                    <tr key={index}>
                    <th scope="row">{data.rows[innerAttr].BillNO}</th>
                    <td> {data.rows[innerAttr].Address1}</td>
                    <td> {data.rows[innerAttr].IndianCompany}</td>
                    <td> {data.rows[innerAttr].Product}</td>
                    <td> {data.rows[innerAttr].ForeignCountry}</td>
                    </tr>
                    
                  )})
              }
          
        </tbody>
      </table>
      </div>

      <div className='container'>
        <div  className='row'>
          <div id='footer_d' className='col'></div>
        </div>
      </div>
      
      </>
      
      )}
      </div>
    </div>
  );
}

export default App;
