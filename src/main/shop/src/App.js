
/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import bg from './image/bg.png'
import data from './data.js'
import { Suspense, createContext, lazy, useEffect, useState } from 'react';

import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
// import Detail from './routes/detail.js';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Cart from './routes/cart.js';
import { useQuery } from 'react-query';
export let Context1 = createContext()

const Detail = lazy(() => import('./routes/detail.js')) 
const Cart = lazy( () => import('./routes/cart.js'))

function App() {

  let obj = {name : 'hong'}
  localStorage.setItem('data', JSON.stringify(obj)) // f12 검사창 localStorage(방문기록 담기는)에 값 저장, 
  console.log(JSON.parse(localStorage.getItem('data')).name)
  localStorage.removeItem('data')


  let [shose, setShose] = useState(data);
  let nevigate = useNavigate();
  let [stock] = useState([10, 11, 12])

  
  useEffect(() => {
    if(localStorage.getItem('watched') == null){
      
      localStorage.setItem('watched' , JSON.stringify([]))
    }
  },[])

  let result = useQuery('name', ()=> {
    return axios.get('/api/name')
                .then((a) => {
                  console.log(a.data)
                  return a.data
                })
  })

  // result.data -> 성공했을떄의 데이터를 보여줌
  // result.isLoding -> 요청이 로딩중일때 true라고 보여줌
  // result.error -> 요청이 실패했을때 true라고 보여줌

  return (
    <div className="App">

    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick = {() => {nevigate("/")}}  style={{padding: '5px', textDecoration: 'none', color: 'white'}}>홈</Nav.Link>
            <Nav.Link onClick = {() => {nevigate("/detail")}} style={{padding: '5px', textDecoration: 'none', color: 'white'}}>상세페이지</Nav.Link>
            <Nav.Link onClick = {() => {nevigate("/cart")}} style={{padding: '5px', textDecoration: 'none', color: 'white'}}>장바구니</Nav.Link>
            <Nav className='ms-auto' style={{color : 'white'}}>
                {result.isLoading && '로딩중'}
                {result.data && result.data}
                {result.error && '에러남'}
            </Nav>
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback ={<div>로딩중</div>}>
        <Routes>
            <Route path='/' element={
              <>
                  <div className='main-bg' style={{backgroundImage: 'url(' + bg + ')'}}></div>

                    <div className='container'>
                      <div className='row'>
                      {
                      shose.map((a, i) => {
                        return (
                          <Card shose ={shose[i]} i={i}/>
                        )
                      })
                      
                      }

                      </div>
                    </div>
                    <button onClick={() => {
                      axios.get('/api/data')
                      .then((respose) => {
                        
                        console.log(respose.data.data);


                        let copy = [...shose , ...respose.data.data];
                        setShose(copy);
                      })
                      .catch((error) => {
                        console.log(error);
                      })


                      axios.post('/api/postData' , {name: "Red Knit"})
                      .then((respose) => {
                          
                          console.log(respose.data.data);
  
  
                        })
                         .catch((error) => {
                          console.log(error);
                        })

                    }}>
                      버튼
                    </button>
                 
              </>
            }></Route>

              <Route path='/detail/:id' element={
                <Context1.Provider value={{stock}}>
        
                    <Detail shose={shose}/> 
              </Context1.Provider>
              
              }> </Route>

              
            <Route path='/cart' element={<Cart/>}></Route>

            <Route path='*' element={<div>없는 페이지입니다.</div>}></Route>
            <Route path='/about' element={<About/>}>
              <Route path='member' element={<div>멤버</div>}></Route>
              <Route path='location' element={<div>위치</div>}></Route>

            </Route>
      

        </Routes>
        </Suspense>
 



    </div>
  );
}


function About(){
  return(
    <div>
        <h3>회사정보</h3>
        <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return(
        <div className='col-md-4'>
        <img src = {process.env.PUBLIC_URL + '/image/shoes' + (props.i + 1) + '.jpg'} height='80%' />
        <h4>{props.shose.title}</h4>
        <p>{props.shose.price}</p>
      </div>
  )
   
}

export default App;
