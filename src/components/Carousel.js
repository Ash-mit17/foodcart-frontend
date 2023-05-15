import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div>
                <div id="demo" className="carousel slide" data-bs-ride="carousel" style={{"objectFit":"contain","maxHeight":"500px"}}>
                    <div className='carousel-caption' style={{"zIndex":"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/600×500?burger" alt="Los Angeles" className="d-block w-100" height={550} style={{"objectFit":"cover"}} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/600×500?pizza" alt="Chicago" className="d-block w-100" height={550} style={{"objectFit":"cover"}} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/600×500?kfc" alt="New York" className="d-block w-100" height={550} style={{"objectFit":"cover"}} />
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

        </div>
    )
}
// "https://source.unsplash.com/random/900×700?burger"