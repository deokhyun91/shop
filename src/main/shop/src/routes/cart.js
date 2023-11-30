import { memo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName,  changeAge} from "./../store/userSlice.js";
import { addCount } from "./../store.js";

// function Child(){
//     console.log("재랜더링됨")
//     return <div>자식임</div>
// }
let Child = memo(function(){
        console.log("재랜더링됨")
        return <div>자식임</div>
})

function Cart() {

    let state = useSelector((state) => {return state}) //store에 있는 r값 가져오는 훅 함수 //state에 있는 값을 다가져오기 떄문에 state.user 필요한것만 가져와서써야함
    // console.log(a)
    // console.log(a.user)
    // console.log(a.stock)
    
    console.log(state.cart)
    let dispatch = useDispatch() // 값 변경 요청

    let[count, setCount] = useState(0);
    return (
        <div>
            <Child count={count}></Child>
            {/* 버튼 클릭했을떄 Child 컴포넌트는 재랜더링안됨 대신 count={count} 처럼 props 로 내리면 변할때마다 재랜더링됨*/}
            <button onClick={() => {setCount(count + 1)}}></button> 
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
     
            <button onClick={() => {
                 dispatch(changeAge(100))
            }}>버튼</button>
       
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                   
                        {
                           state.cart.map((a, i) => 
                                
                                    <tr key={i}>
                        
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td><button onClick={ () => {
                                         dispatch(addCount(state.cart[i].id))
                                    }}>*</button></td>
                                  
                                    </tr>
                                
                            )
                        }
                   
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;