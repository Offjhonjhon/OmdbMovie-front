import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router';
import { useLoading, Puff } from '@agney/react-loading';
import { AiFillHeart } from 'react-icons/ai';

function MoviePoster({ movie, isLoading }) {
    const [favorited, setFavorited] = useState(false)
    let navigate = useNavigate();
    const { containerProps, indicatorEl } = useLoading({
        loading: isLoading,
        indicator: <Puff width="50" />,
    });

    function handleClick() {
        navigate(`/movie/${movie.imdbID}`)
    }

    function handleFavorited(event) {
        event.stopPropagation();
        console.log('funcionou')
        setFavorited(!favorited);
    }


    return (
            <MoviePosterContainer onClick={handleClick}>
                <Poster url={movie.Poster} />
                <PosterInfo>
                    <FavoriteButton 
                        color={favorited ? '#CE0D00' : '#FFFFFF'} 
                        onClick={handleFavorited}
                    />
                    <PosterTittle>{movie.Title}</PosterTittle>
                    <PosterYear>{movie.Year}</PosterYear>
                </PosterInfo>
            </MoviePosterContainer>
    )

}

export default MoviePoster;

const Poster = styled.div`
    width: 173px;
    height: 240px;
    border-radius: 5px;
    background-image: url(${props => props.url});
    background-size: cover;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover {
        transition: 0.8s;
    }
`;

const MoviePosterContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 165px;
    height: 240px;
    object-fit: cover;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
`;

const PosterInfo = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 173px;
    height: 240px;
    background-color: #000;
    background-size: cover;
    opacity: 0;

    &:hover {
        transition: 0.5s;
        opacity: 0.75;
    }
`
const PosterTittle = styled.h2`
    @import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-family: 'Ropa Sans', sans-serif;
    font-size: 20px;
    color: #FFF;
    width: 70%;
    height: 200px;
    margin-top: 120px;
    margin-left: 10px;
    margin-bottom: 10px;
`
const PosterYear = styled.h3`
    @import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');

    font-family: 'Ropa Sans', sans-serif;
    font-size: 15px;
    color: #FFF;
    margin-left: 10px;
    margin-bottom: 10px;
    color: #ABA1A1;
`

const FavoriteButton = styled(AiFillHeart)`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    transition: 0.5s;
    color: ${props => props.color};
    &:hover{
        color: black;
    }
`;


