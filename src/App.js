import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchContext from './Context/searchContext.js';

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
    return (
        <BrowserRouter>
            <SearchContext.Provider value={{ movie, setMovie, search, setSearch, page, setPage }}>
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
            </SearchContext.Provider>
        </BrowserRouter>
    )
}

export default App;