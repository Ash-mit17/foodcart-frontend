import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import baseUrl from '../baseUrl';
import { notifySuccess } from '../components/toast';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div style={{"backgroundColor":"white","color":"black"}} className='m-5 w-70 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch(`${baseUrl}/data/orderData`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    notifySuccess("Order Placed, Thank You!");
    if (response.status === 201) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div className='container my-5 p-3 bg-white text-black'>
  <div className='table-responsive'>
    <table className='table table-hover'>
      <thead className='text-success fs-4'>
        <tr>
          <th scope='col'>Sn</th>
          <th scope='col'>Name</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Options</th>
          <th scope='col'>Amount</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {data.map((food, index) => (
          <tr key={index}>
            <th scope='row'>{index + 1}</th>
            <td className='text-dark'>{food.name}</td>
            <td className='text-dark'>{food.qty}</td>
            <td className='text-dark'>{food.size}</td>
            <td className='text-dark'>{food.price}</td>
            <td>
              <button type="button" className="btn btn-link p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                <Delete className='p-0' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div>
    <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
  </div>
  <div>
    <button className='btn btn-success mt-5 mb-2' onClick={handleCheckOut}>Check Out</button>
  </div>
</div>

  )
}

// style={{"color":"white"}}