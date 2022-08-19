import React from "react";

function Heading(props){
    return(
        <div className="col">
            <h1>{props.heading}</h1>
        </div>
    )
}

export default Heading;