import styled from 'styled-components';
import { Rings } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MoviePoster(poster, isLoading) {

    return (
        <Link to={`/movie/${poster.movie.imdbID}`}>
            <MoviePosterContainer>
                <Poster src={poster.movie.Poster} alt={poster.Title} />
            </MoviePosterContainer>
        </Link>
    )
}

export default MoviePoster;

const Poster = styled.img`
    width: 165px;
    height: 240px;
    object-fit: cover;
    border-radius: 5px;
    
    
`;

const MoviePosterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 165px;
    height: 240px;
    object-fit: cover;
    border-radius: 5px;
`;

const MoviePosterImage = styled.img`
    width: 165px;
    height: 240px;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
`;

const MoviePosterLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 165px;
    height: 240px;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
`;

const MoviePosterLoadingSpinner = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    animation: spin 1s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
