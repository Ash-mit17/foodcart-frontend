import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
    const [search, setSearch] = useState("")
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])

    const loadData = async () => {
        let response = await fetch("https://foodcart.onrender.com/fooddata", {

            method: "POST",
            headers: { 'Content-Type': 'application/json' },

        });
        response = await response.json();
        // console.log(response[0],response[1]);
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])





    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <div id="demo" className="carousel slide" data-bs-ride="carousel" style={{ "objectFit": "contain", "maxHeight": "500px" }}>
                    <div className='carousel-caption' style={{ "zIndex": "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                           
                        </div>
                    </div>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/600×500?burger" alt="Los Angeles" className="d-block w-100" height={550} style={{ "objectFit": "cover" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/600×500?pizza" alt="Chicago" className="d-block w-100" height={550} style={{ "objectFit": "cover" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/600×500?kfc" alt="New York" className="d-block w-100" height={550} style={{ "objectFit": "cover" }} />
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>

            <div className='container' style={{ "margin": "62px 0" }}>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                    <hr />
                                    {foodItem !== [] ? foodItem.filter((item) =>(item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLowerCase()))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card
                                                        foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                    ></Card>
                                                </div>
                                            )
                                        }) : <div>No such data</div>}
                                </div>

                            )
                        })
                        : <div>""""</div>

                }
            </div>
            <Footer />
        </div>
    )
}
