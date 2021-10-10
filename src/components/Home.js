import React from 'react';

//config
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

import HeroImage from './HeroImage'
import Grid from './Grid'
import Thumb from './Thumb'
import Spinner from './Spinner'
import SearchBar from './SearchBar'
import Button from './Button';

// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';

//image
import NoImage from '../images/no_image.jpg';

const Home = () => {
    // useHomeFetch is a custom Hook use for setting the state variables below
    const {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();

    console.log(state);

    if (error) return <div>Something went wrong...</div>

    return (
        // the below syntax is called a fragment
        // check that there is no searchTerm and the results is not empty
        <>
            {!searchTerm && state.results[0] ?     <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                /> 
            : null}
            <SearchBar setSearchTerm={setSearchTerm}/>
            <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                {state.results.map(movie =>(
                   // <div key={movie.id}>{movie.title}</div>
                   <Thumb
                        key={movie.id}
                        clickable={true}
                        image={
                            movie.poster_path
                                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                : NoImage
                        }
                        movieId={movie.id}>
                   </Thumb>
                ))}
            </Grid>
            {loading && <Spinner />}
            {state.page < state.total_pages && !loading && (
                <Button text='Load More' callback={()=>setIsLoadingMore(true)} />
            )}
        </>
    )
}

export default Home