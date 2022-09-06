import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api.js';
import MoviePoster from '../Components/MoviePoster.js';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';


function Movies() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const movie = useParams().movie;
    const page = useParams().page;
    const [totalMovies, setTotalMovies] = useState(0);
    const [disableLeft, setDisableLeft] = useState(false);
    const [disableRight, setDisableRight] = useState(false);
    const totalPages = Math.ceil(totalMovies / 10);




    useEffect(() => {
        axios.get(api.moviesUrl + 's=' + movie + '&page=' + page)
            .then(response => {
                setMovies(response.data.Search);
                setTotalMovies(response.data.totalResults);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })

        page === "1" ? setDisableLeft(true) : setDisableLeft(false);
        page === totalPages ? setDisableRight(true) : setDisableRight(false);
        console.log(disableRight)
        console.log(page)
        console.log(totalPages)
    }, [movie, page]);

    if (movies === undefined || movies.length === 0) {
        return (
            <MoviesContainer>
                <h1>Procurar</h1>
            </MoviesContainer>
        )
    }

    return (
        <MoviesContainer>
            <MoviesPosters>
                {movies.map(movie => {

                    return (
                        <MoviePoster key={movie.imdbID} movie={movie} isLoading={isLoading} />
                    )
                })}
            </MoviesPosters>

            <MoviesNavigation>
                <LeftArrow color={disableLeft ? '#000' : "#fff"} onClick={
                    (e) => {
                        if (!disableLeft) {
                            e.preventDefault();
                            window.location.href = '/movies/' + movie + '/' + (+page - 1);
                        }
                    }
                } />
                <Pages>{`${page}/${totalPages}`}</Pages>
                <RightArrow color={disableRight ? '#000' : "#fff"} onClick={
                    (e) => {
                        if (!disableRight) {
                            e.preventDefault();
                            window.location.href = '/movies/' + movie + '/' + (+page + 1);
                        }
                    }
                } />
            </MoviesNavigation>

        </MoviesContainer>
    )

}

export default Movies;

const MoviesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: black;
    overflow: scroll;
`

const MoviesPosters = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 150px;
    width: 60vw;
    gap: 30px;
    justify-content: center;
    @media (max-width: 900px) {
        width: 100vw;
    }
`

const MoviesNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60vw;
    bottom: 0px;
    gap: 30px;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: 20px;
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
    color: ${props => props.color};
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.5);
    }
`

const Pages = styled.div`
    color: #fff;
`

