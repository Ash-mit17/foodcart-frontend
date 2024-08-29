import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import { notifySuccess, notifyWarning } from '../components/toast';

export default function Card(props) {
    let data = useCart();
    let dispatch = useDispatchCart();
    const priceRef = useRef();
    const options = props.options;
    const priceOptions = Object.keys(options)
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddtoCart = async () => {

        if (localStorage.length === 0) {
            notifyWarning("Please login/signup to add items to cart");
            return;
        }

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                notifySuccess("Item Updated");
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                notifySuccess("Item Added to Cart");
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        notifySuccess("Item Added to Cart");
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div style={{ minWidth: "350px", margin: "5px 10px" }}>
            <div className="card mt-8" style={{ "width": "100%", "maxHeight": "400px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." height={200} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        <select className='m-2 h-100 bg-warning rounded' onChange={(e) => { setQty(e.target.value) }}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-warning rounded' ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            {finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-center m-2' onClick={handleAddtoCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
