
import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Heading from "./components/Heading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourites from "./components/RemoveFavourites";

function App(){
  
    const [movies, setMovies] =useState([]);
    const [searchValue, setSearchValue] =useState("");
    const [favourites, setFavourites] = useState([]);

      const getMovieRequest =async (searchValue)=>{
          const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=1f58d060`;
          const response =await fetch(url);
          const responseJson = await response.json();

          if(responseJson.Search){
          setMovies(responseJson.Search);
          }
      };

      useEffect(()=>{
          getMovieRequest(searchValue);} , [searchValue]
      );


      useEffect(()=>{
          const movieFavourites =JSON.parse(
              localStorage.getItem('react-movie-app-favourites')); 

              setFavourites(movieFavourites);

          }, []);


      const saveToLocalStorage = (items)=>{
          localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));

      };

      const addFavouriteMovie = (movie)=>{
          const newFavouriteList =[...favourites, movie];
          setFavourites(newFavouriteList);
          saveToLocalStorage(newFavouriteList);
            
      }

      const removeFavouriteMovie = (movie)=>{
          const newFavouriteList =favourites.filter(

              (favourite)=> favourite.imdbID !== movie.imdbID 
              
              );

              setFavourites(newFavouriteList);
              saveToLocalStorage(newFavouriteList);

      }


    return (
        <div className="container-fluid movie-app "> 
           <div className="row d-flex align-items-center mt-4 mb-4">
               <Heading heading="Movies" />
               <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
           </div>
            <div className="row row-cols-auto">
              
                <MovieList 
                
                movies ={movies}  
                favouriteComponent = {AddFavourite}
                handleFavouritesClick ={addFavouriteMovie}
                />
              
            </div>

            <div className="row d-flex align-items-center mt-4 mb-4">
               <Heading heading="Favourites" />
               
           </div>

           <div className="row row-cols-auto">
              
                <MovieList 
                
                movies ={favourites}  
                handleFavouritesClick ={removeFavouriteMovie}
                favouriteComponent = {RemoveFavourites}

                />
              
            </div>




        </div>
    );
}

export default App;