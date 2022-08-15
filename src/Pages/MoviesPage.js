import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api.js';
import MoviePoster from '../Components/MoviePoster.js';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';



function Movies() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const movie = useParams().movie;
    const page = useParams().page;
    const [disable, setDisable] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        axios.get(api.moviesUrl + 's=' + movie + '&page=' + page)
            .then(response => {
                setMovies(response.data.Search);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })

        page === "1" ? setDisable(true) : setDisable(false);
    }, [movie, page]);

    if (movies === undefined) {
        return (
            <MoviesContainer>
                <h1>Procurar</h1>
            </MoviesContainer>
        )
    }

    return (
        <MoviesContainer>
            <MoviesPosters>
                {movies.map(poster => {
                    console.log(isLoading)
                    return (
                        <MoviePoster key={poster.imdbID} isLoading={isLoading} movie={poster} />
                    )
                })}
            </MoviesPosters>

            <MoviesNavigation>
                <LeftArrow disable={disable} color={disable ? '#000' : "#fff"} onClick={
                    () => {
                        window.location.href = '/movies/' + movie + '/' + (+page - 1);
                    }
                } />
                <RightArrow onClick={
                    () => {
                        window.location.href = '/movies/' + movie + '/' + (+page + 1);
                    }
                } />
            </MoviesNavigation>

        </MoviesContainer>
    )

}

export default Movies;

const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: black;
    overflow: scroll;
`

const MoviesPosters = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px,150px));
    width: 60vw;
    margin-top: 150px;
    gap: 30px;
    justify-content: center;
    margin-bottom: 100px;
    @media (max-width: 900px) {
        width: 100vw;
    }
`

const MoviesNavigation = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 60vw;
    bottom: 0px;
    gap: 30px;
    justify-content: center;
    margin-bottom: 30px;
    @media (max-width: 768px) {
        width: 100vw;
    }
`

const LeftArrow = styled(AiOutlineArrowLeft)`
    color: ${props => props.color};
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.5);
    }
`

const RightArrow = styled(AiOutlineArrowRight)`
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.5);
    }
`

