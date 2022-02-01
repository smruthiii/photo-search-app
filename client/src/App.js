import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import './components/PhotoViewer'
import PhotoViewer from './components/PhotoViewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination'

function App() {
  const [data, setData] = useState(null)
  const [photos, setPhotos] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    apiResponse()
    getPics()
  }, []);

  const getPics = (pageNum = 0) => {
    fetch(`/curatedPics?page=${pageNum > 0 ? pageNum : pageNumber}&per_page=10`).then(res => res.json()).then((data) => {
      setPhotos(data.photos)})
  }

  const apiResponse = () => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => {
      setData(data.message)});
  }

  const changePageNumber = (changeType) => {
    switch (changeType) {
      case ('next'): 
      if (pageNumber < 80){
      setPageNumber(pageNumber+1)
      getPics(pageNumber+1)}
      break;
      case('prev'):
      if (pageNumber > 1){
      setPageNumber(pageNumber-1)
      getPics(pageNumber-1)
    }
    break;
    case('last'): 
    setPageNumber(80)
    getPics(80)
    break;
    case('first'):
    setPageNumber(1)
    getPics(1)
    break;
    }
    
  }

  return (
    <div >
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={getPics}>get curated photos</button> */}
        
      {photos ? (<PhotoViewer photos={photos}/>) : null}
        <Pagination>
          <Pagination.First onClick={() => changePageNumber('first')}/>
          <Pagination.Prev onClick={() => changePageNumber('prev')}/>
          <Pagination.Next onClick={() => changePageNumber('next')}/>
          <Pagination.Last onClick={() => changePageNumber('last')}/>
        </Pagination>
      </header>
    </div>
  );
}

export default App;
