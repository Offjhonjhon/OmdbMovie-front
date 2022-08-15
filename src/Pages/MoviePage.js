import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import axios from 'axios';

import imdbLogo from "../assets/imdbLogo.png";


function MoviePage() {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(api.moviesUrl + 'i=' + imdbID)
            .then(response => {
                console.log(response.data);

                setMovie(response.data);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])


    if (!movie) {
        return (
            <MoviePageContainer>
                <MoviePageLoading>
                </MoviePageLoading>
            </MoviePageContainer>
        )
    }

    console.log(movie.Actors.split(', '));

    return (
        <MoviePageContainer>
            <MoviePageInfo>
                <Title>{movie.Title}</Title>
                <Imdb>
                    <ImdbLogo src={imdbLogo} />
                    {movie.Ratings[0].Value}</Imdb>
                <MovieDescription>
                    <BoxTittle>Synopsis</BoxTittle>
                    {movie.Plot}
                </MovieDescription>
                <MoviePageCastInformation>
                    <MovieCast>
                        <BoxTittle>Cast</BoxTittle>
                        {movie.Actors.split(', ').map(actor => {
                            return (
                                <Item key={actor}>{actor}</Item>
                            )
                        })}
                    </MovieCast>
                    <MovieGenre>
                        <BoxTittle>Genre</BoxTittle>
                        {movie.Genre.split(', ').map(genre => {
                            return (
                                <Item key={genre}>{genre}</Item>
                            )
                        })}
                    </MovieGenre>
                    <MovieDirector>
                        <BoxTittle>Director</BoxTittle>
                        <Item>{movie.Director}</Item>
                    </MovieDirector>
                </MoviePageCastInformation>

            </MoviePageInfo>
            <Poster src={movie.Poster} />
        </MoviePageContainer>
    )
}

export default MoviePage;

const MoviePageContainer = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    padding-top: 100px;
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    background-color: black;

    @media (max-width: 600px) { 
        flex-direction: column;
    }
`

const Poster = styled.img`
    width: 288px;
    height: 432px;
    display: block;
    border-radius: 10px;
    margin-left: 40px;
    margin-top: 55px;
`

const MoviePageLoading = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
`
const Title = styled.h1`
    margin-top: 50px;
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-bottom: 1rem;
`
const MoviePageInfo = styled.div`
`
const Imdb = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    padding-left: 2px;
    color: #fff;
    width: 90px;
    border: 1px solid #fff;
    border-radius: 5px;
`
const MovieDescription = styled.div`
    margin-top: 20px;
    font-size: 1rem;
    color: #fff;
    width: 400px;
`
const BoxTittle = styled.h1`
    font-size: 20px;
    color : #f5f5f5 ;
`
const ImdbLogo = styled.img`
    width: 40px;
    height: 20px;
`
const MoviePageCastInformation = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    gap: 20px;
`

const MovieCast = styled.div`
`
const Item = styled.p`
    color: #fff;
`
const MovieGenre = styled.div`
`
const MovieDirector = styled.div`
`
