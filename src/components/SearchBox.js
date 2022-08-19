import React from "react";

function SearchBox(props){
    return(

        <div className="col col-sm-3">
            <input  
            value={props.value} 

            onChange={(event)=>{props.setSearchValue(event.target.value)}}


            className="form-control" 
            placeholder="type to search a movie...">

            </input>
        </div>
    )
}

export default SearchBox;