import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import PageContext from '../Context/pageContext.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api.js';
import MoviePoster from '../Components/MoviePoster.js';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';



function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalMovies, setTotalMovies] = useState(0);
    const [disableLeft, setDisableLeft] = useState(false);
    const [disableRight, setDisableRight] = useState(false);
    const [type, setType] = useState('');
    const movie = useParams().movie;
    const page = useParams().page;
    
    const totalPages = Math.ceil(totalMovies / 10);

    useEffect(() => {
        setLoading(true);
        axios.get(api.moviesUrl + 's=' + movie + '&type=' + type + '&page=' + page)
            .then(response => {
                setMovies(response.data.Search);
                setTotalMovies(response.data.totalResults);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })

        page === "1" ? setDisableLeft(true) : setDisableLeft(false);
        page === totalPages ? setDisableRight(true) : setDisableRight(false);
    }, [movie, page, type]);
  
    function handleSectionChange(type) {
        setType(type);
    }

    return (
        <MoviesContainer>
            <Genres display={(loading || !movies) ? 'none' : 'flex'}>
                <Type onClick={() => handleSectionChange('')} color={type === '' ? "#000" : "#FFF" }>ALL</Type>
                <Type onClick={() => handleSectionChange('movie')} color={type === 'movie' ? "#000" : "#FFF" }>MOVIES</Type>
                <Type onClick={() => handleSectionChange('series')} color={type === 'series' ? "#000" : "#FFF" }>SERIES</Type>
                <Type onClick={() => handleSectionChange('game')} color={type === 'game' ? "#000" : "#FFF" }>GAMES</Type>
            </Genres>
            <PageTittle display={(loading || !movies) ? 'none' : 'block'}>SEARCH RESULTS</PageTittle>
            <MoviesPosters>
                {  (movies && !loading) ? (
                    movies.map(movie => {
                        return (
                            <MoviePoster key={movie.imdbID} movie={movie} isLoading={loading} />
                        )
                    })
                    ) 
                    : (!movies && !loading) 
                        ? (<NotFound>NO RESULTS FOUND</NotFound>) 
                        : (<></>)

                }
            </MoviesPosters>

            <MoviesNavigation visibility={(loading || !movies) ? 'hidden' : 'visible'}>
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
    padding-top: 100px;
 
`

const MoviesPosters = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
    margin-top: 50px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-left: 15px;
    }

`

const MoviesNavigation = styled.div`
    display: flex;
    visibility: ${props => props.visibility};
    transition: 0.5s;
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
const Genres = styled.div`
    display: ${props => props.display};
    justify-content: space-around;
`
const Type = styled.span`
    @import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');

    font-family: 'Ropa Sans', sans-serif;
    font-size: 20px;
    color: ${props => props.color};
    cursor: pointer;
`
const NotFound = styled.span`
    @import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');
    width: 100vw;
    text-align: center;
    font-family: 'Ropa Sans', sans-serif;
    font-size: 40px;
    color: #FFF;
`
const PageTittle = styled.h1`
    @import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');

    display: ${props => props.display};
    font-family: 'Ropa Sans', sans-serif;
    font-size: 35px;
    color: #FFF;
    margin-top: 50px;
    margin-left: -100px;

    @media (max-width: 700px) {
        margin-left: 10px;
    }
`

