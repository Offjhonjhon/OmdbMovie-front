import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SearchContext from './Context/searchContext.js';
import PageContext from './Context/pageContext.js';
import GenreContext from './Context/genreContext.js';
import MovieContext from './Context/movieContext.js';

import Signin from './Pages/SigninPage.js';
import Signup from './Pages/SignupPage.js';
import Movies from './Pages/MoviesPage.js';
import Header from './Components/Header.js';
import Home from './Pages/HomePage.js';
import Movie from './Pages/MoviePage.js';
import Background from './Components/Background.js';

function App() {
    const [movie, setMovie] = useState('');
    const [search, setSearch] = useState(false);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState('');

    return (
        <BrowserRouter>
            <SearchContext.Provider value={{search, setSearch}}>
                <PageContext.Provider value={{page, setPage}}>
                    <MovieContext.Provider value={{movie, setMovie}}>
                        <GenreContext.Provider value={{genre, setGenre}}>
                            <Background>
                            <Header />
                            <Routes>
                                <Route path="/" element={<Signin />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/movies/:movie/:page" element={<Movies />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/movie/:imdbID" element={<Movie />} />
                            </Routes>
                            </Background>
                        </GenreContext.Provider>
                    </MovieContext.Provider>
                </PageContext.Provider>
            </SearchContext.Provider>


        </BrowserRouter>
    )
}

export default App;