//styled import
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { tab } from "@testing-library/user-event/dist/tab";
import { Context1 } from "./../App.js";
import { addList } from "../store.js";
import { useDispatch } from "react-redux";

let YellowBtn = styled.button`
	background : ${props => props.bg};
	color: ${props => props.bg ==  'orange' ? 'white' : 'black'}
	padding : 10px;
`

let Box = styled.div`
	background : grey;
	padding : 20px;
`

let NewBtn = styled(YellowBtn)`
	margjn: 5px
`

function Detail(props) {
	let dispatch = useDispatch()

	let {stock} = useContext(Context1);

	let [count, setCount] = useState(0);
    let {id} = useParams(); // 자동완성으로 import해야함
	let [alert, setAlert] = useState(true);
	let [tab, setTab] = useState(0);
	
	//방문기록, 최근본 상품
	useEffect(() => {
		console.log(id)
		console.log(localStorage.getItem('watched'))

		let findId = localStorage.getItem('watched')
		findId = JSON.parse(findId)
		findId.push(id)
		findId = new Set(findId) //중복안들어가게
		findId = Array.from(findId) //중복안들어가게
		localStorage.setItem('watched', JSON.stringify(findId))
	  })


	 // 자동완성
	useEffect(() => {

	console.log('hi'); // mount, update 시 동작,, 밑에 html 다 실행되고 나중에 실행됨, 그냥 console.log랑 순서가 다름
	let timer = setTimeout(() => {   //자동완성
		
		setAlert(false);
	},3000)

	return () => { //unmount 될 때 실행, 초기화
		clearTimeout(timer);	
	}
	},[count]) //count 될때마다 useEffect실행


    return(
        <div className="container">
		{stock}
	
	
	{ alert == true ?      
		<div className="alert alsert-warning" style={{background : "yellow"}}>
		3초 이내 구매시 할인
		</div>
		: null     
	}
	
	{count}
	<Box>
		<YellowBtn bg="yellow" onClick={() => {setCount(count + 1)}}>버튼</YellowBtn>
		<YellowBtn bg="orange" onClick={() => {console.log("오렌지 버튼 클릭")}}>버튼</YellowBtn>
		<NewBtn bg="orange">버튼</NewBtn>
	</Box>
            <div className="row">
                <div className="col-md-6">
                    <img src={"/image/shoes" + (Number(id) + 1 ) + ".jpg"}></img>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shose[id].title}</h4>
                    <p>{props.shose[id].content}</p>
                    <p>{props.shose[id].price}</p>
                    <button className="btn btn-danger" onClick={() => {
							
							  dispatch(addList({id: props.shose[id].id, name: props.shose[id].title, count: 5}))
					}}>주문하기</button>
                </div>
            </div>

		<Nav variant="tabs" defaultActiveKey="link-0">
		
			<Nav.Item>
				<Nav.Link eventKey="link-0" onClick={() => {
					setTab(0);
				}}>상세페이지</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="link-1" onClick={() => {
				setTab(1);
				}}>리뷰</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="link-2" onClick={() => {
					setTab(2);
				}}>QnA</Nav.Link>
			</Nav.Item>
			
		</Nav>
		<TabContent tab={tab}/>

	
		
        </div>
    )
}

function TabContent({tab}){
	// if (tab == 0){
	// 	return <div>상세페이지</div>
	// }else if (tab == 1){
	// 	return <div>리뷰</div>
	// }else if (tab == 2){
	// 	return <div>QnA</div>
	// } 

	let[fade, setFade] = useState('');
	let {stock} = useContext(Context1);

	//바뀔때마다 효과 
	useEffect(() => {
	
		setTimeout(() => {setFade("end")}, 100)
		return () => {
			// 초기화 할때 리턴 사용
			setFade('')
		}
	},[tab])

	return (
		<div className= {"start " + fade}>
			 {/* array[0] 과 같은 구조  */}
			{[<div>상세페이지</div>, <div>{stock}</div>, <div>QnA</div>][tab]} 
		</div>
	) 
	

}

export default Detail; 