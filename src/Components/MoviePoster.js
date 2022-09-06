import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoading, Puff } from '@agney/react-loading';

function MoviePoster({ movie, isLoading }) {
    const { containerProps, indicatorEl } = useLoading({
        loading: isLoading,
        indicator: <Puff width="50" />,
    });

    return (
        <Link to={`/movie/${movie.imdbID}`}>
            <MoviePosterContainer>
                <Poster src={movie.Poster} />
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
    background-color: white;
`;


