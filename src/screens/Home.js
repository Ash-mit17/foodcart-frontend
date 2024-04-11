import React, { useEffect, useState } from 'react'
import ResponsiveNavbar from '../components/Navbar'
import './Home.css'
import Footer from '../components/Footer'
import Card from '../components/Card'
import baseUrl from '../baseUrl';
import { Skeleton } from '@mui/material'
//  https://foodcart.onrender.com/fooddata
export default function Home() {
    const [search, setSearch] = useState("")
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])

    const loadData = async () => {
        let response = await fetch(`${baseUrl}/data/fooddata`, {

            method: "GET",
            headers: { 'Content-Type': 'application/json' },

        });
        response = await response.json();
        setFoodItem(response.data[0]);
        setFoodCat(response.data[1]);
    }

    useEffect(() => {
        loadData()
    }, [])





    return (
        <div className='w-100'>
            <div>
                <ResponsiveNavbar />
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

            <div className='d-flex flex-wrap' style={{ "margin": "62px 0", width: "100vw" }}>
                {
                    foodCat.length !== 0
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3 '>
                                    <div key={data._id} className='fs-3 m-3'><strong>{data.CategoryName}</strong></div>
                                    <hr />
                                    <div className='d-flex flex-row flex-wrap'>
                                    {foodItem.length !== 0 ? foodItem.filter((item) =>(item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLowerCase()))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id}>
                                                    <Card
                                                        foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                    ></Card>
                                                </div>
                                            )
                                        }) : <div>No such data</div>}
                                    </div>
                                    
                                </div>

                            )
                        })
                        : <div><Skeleton variant="rectangular" height={300} /></div>

                }
            </div>
            <Footer />
        </div>
    )
}
