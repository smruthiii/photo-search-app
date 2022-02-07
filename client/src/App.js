import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import './components/PhotoViewer/PhotoViewer'
import PhotoViewer from './components/PhotoViewer/PhotoViewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination'
import Spinner from 'react-bootstrap/Spinner'
import Search from './components/Search/Search'

function App() {
  const [data, setData] = useState(null)
  const [photos, setPhotos] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (!window.localStorage.getItem('photos')) {
      getPics()
    } else {
      setPhotos(JSON.parse(window.localStorage.getItem('photos')));
    }
    if (window.localStorage.getItem('pageNumber')) {
      setPageNumber(JSON.parse(window.localStorage.getItem('pageNumber')))
    }
    if (window.localStorage.getItem('searchString')) {
      setSearchString(JSON.parse(window.localStorage.getItem('searchString')))
    }
    setLoading(false)
  }, []);



  const getPics = (pageNum = 0) => {
    fetch(`/curatedPics?page=${pageNum > 0 ? pageNum : pageNumber}&per_page=10`).then(res => res.json()).then((data) => {
      setPhotos(data.photos)
      window.localStorage.setItem('photos', JSON.stringify(data.photos))
      setSearchString('')
      window.localStorage.setItem('pageNumber', pageNum > 0 ? pageNum : pageNumber)
      setPageNumber(pageNum > 0 ? pageNum : pageNumber)
      window.scrollTo(0, 0)
    })
  }

  const search = (searchString, pageNum = 0) => {
    fetch(`/searchPics?page=${pageNum > 0 ? pageNum : pageNumber}&searchString=${searchString}`).then(res => res.json()).then((data) => {
      setPageNumber(pageNum)
      setPhotos(data.photos)
      window.localStorage.setItem('photos', JSON.stringify(data.photos))
      window.localStorage.setItem('searchString', JSON.stringify(searchString))
      window.scrollTo(0, 0)
    }).catch(e => 
      console.log(e.message)
    )
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
      window.localStorage.setItem('pageNumber',pageNumber+1)
      if (searchString !== '') {
        search(searchString, pageNumber+1)
      } else {
        getPics(pageNumber+1)
      }}
      break;
      case('prev'):
      if (pageNumber > 1){
      setPageNumber(pageNumber-1)
      window.localStorage.setItem('pageNumber',pageNumber-1)
      if (searchString !== '') {
        search(searchString, pageNumber-1) 
      } else {
        getPics(pageNumber-1)
      }
      getPics(pageNumber-1)
    }
    break;
    case('last'): 
    setPageNumber(80)
    window.localStorage.setItem('pageNumber',80)
    if (searchString !== '') {
      search(searchString, 80)
    } else {
      getPics(80)
    }
    
    break;
    case('first'):
    setPageNumber(1)
    window.localStorage.setItem('pageNumber',1)
    if (searchString !== '') {
      search(searchString, 1)
    } else {
      getPics(1)
    }
    break;
    }
    
  }

  const updateSearchString = searchInput => {
    setSearchString(searchInput)
    if (searchInput === '') {
      getPics(1)
    } else {
      search(searchInput, 1)
    }
    
  }

  return (
    <div >
      <header className="App-header">
       
       {loading ? <Spinner animation='border' role='status' size="lg"/> : (
         <>
         <Search updateSearchString={updateSearchString} /> 
         {photos ? (<PhotoViewer photos={photos}/>) : <PhotoViewer photos={null}/>}
         <Pagination>
           <Pagination.First disabled={pageNumber===1} onClick={() => changePageNumber('first')}/>
           <Pagination.Prev disabled={pageNumber===1}onClick={() => changePageNumber('prev')}/>
           <Pagination.Next disabled={pageNumber===80}onClick={() => changePageNumber('next')}/>
           <Pagination.Last disabled={pageNumber===80} onClick={() => changePageNumber('last')}/>
         </Pagination>
         </>
       )}
      
      </header>
    </div>
  );
}

export default App;
