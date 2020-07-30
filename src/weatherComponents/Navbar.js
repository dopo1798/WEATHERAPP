import React from 'react'

function Navbar(props) {
    return (
        <div className="row">
            <div className="col-md-6">
                <h1 className="title">Weather-App</h1>

            </div>
                <form className="region" onSubmit={(e) => props.changeWeather(e)}>
                    <input className="regioninput" placeholder="Enter Location" onChange={(e) => 
                        {props.changeRegion(e.target.value)}}/>
                </form>
            <div className="col-md-6">


            </div>
            
        </div>
    )
}

export default Navbar
