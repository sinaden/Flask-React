import React from 'react'
import {useState, useEffect} from 'react';

const Pagination = (props) => {
  const [pageNo, setPageNo] = useState(1);

    useEffect(()=>{
      setPageNo(1);
    },[])

    // sending the page number to App.js to be sent over to backend
    const pageButtonHandler = (e) => {
        setPageNo(parseInt(e.target.value));
        props.pageInfo(e.target.value);
    }
   
    // handles logic of the > button (Going to the next page) & sending the data to App.js
    const nextHandler = (e) => {
      
      setPageNo((prepageNo) => prepageNo + 1);
      props.pageInfo(pageNo + 1);
    }
    // handles logic of the < button (Going to the previous page) & sending the data to App.js
    const prevHandler = (e) => {
      if (pageNo > 1) {
        setPageNo((prepageNo) => prepageNo - 1);
        props.pageInfo(pageNo - 1);
      }
    }
    
    return (
      <div className='container'>
      <div className='row'>
        <div className='col'></div>
        <div className='col-12' id='pg_style'>
        <nav className='d-flex justify-content-center' id='pag_c' aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" aria-label="Previous"  onClick={prevHandler}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        <li className="page-item" ><button className="page-link" onClick={pageButtonHandler} value="1">1</button></li>
        <li className="page-item"><button className="page-link" onClick={pageButtonHandler} value="2">2</button></li>
        <li className="page-item"><button className="page-link" onClick={pageButtonHandler} value="3">3</button></li>
        {(pageNo > 3)? (
          <><li className="page-item"><button className="page-link">...</button></li>
          <li className="page-item"><button className="page-link" onClick={pageButtonHandler} value= {pageNo}>{pageNo}</button></li></>
           
        ):<></>}
        

        <li className="page-item">
          <button className="page-link" aria-label="Next"  onClick={nextHandler}>
            <span aria-hidden="true">&raquo;</span>
            <span  className="sr-only">Next</span>
          </button>
        </li>
      </ul>
      </nav>


        </div>
        <div className='col'></div>
     
      </div>
      </div>
    );
}

export default Pagination;