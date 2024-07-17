import React, { useEffect, useState } from 'react'
import './Home.css'
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
                <div id="demo" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: 'contain', maxHeight: '600px' }}>
                    <div className='carousel-caption' style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="./1.jpg" alt="Los Angeles" className="d-block w-100" height={550} style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="carousel-item">
                            <img src="./2.jpg" alt="Chicago" className="d-block w-100" height={550} style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="carousel-item">
                            <img src="./3.jpg" alt="New York" className="d-block w-100" height={550} style={{ objectFit: 'cover' }} />
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

            <div className='container my-5'>
                {foodCat.length !== 0 ? foodCat.map((data) => {
                    const filteredItems = foodItem.filter((item) =>
                        item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())
                    );

                    return (
                        <div className='my-4' key={data._id}>
                            <div className='fs-3 my-3'><strong>{data.CategoryName}</strong></div>
                            <hr />
                            <div className='row'>
                                {filteredItems.length !== 0 ? filteredItems.map((filterItems) => (
                                    <div className='col-md-4 mb-3' key={filterItems._id}>
                                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                                    </div>
                                )) : <div className='col-12'><p>No item found</p></div>}
                            </div>
                        </div>
                    );
                }) :<><p>Backend on render cloud plese wait ...</p>
                        <Skeleton variant="rectangular" height={300} />
                    </>}
            </div>
        </div>
    )
}
