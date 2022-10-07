import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import SearchContext from '../Context/searchContext.js';
import { BiSearch } from 'react-icons/bi';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import logo from '../assets/logo2.png'
import MovieContext from '../Context/movieContext.js';
import PageContext from '../Context/pageContext.js';


function Header() {
    const {setSearch, search} = useContext(SearchContext);
    const {movie, setMovie} = useContext(MovieContext);
    const {setPage} = useContext(PageContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [display, setDisplay] = useState("flex");

    useEffect(() => {
        (window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === "/movie")
            ? setDisplay('none')
            : setDisplay('flex');
    }, [location.pathname]);


    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearch(!search);
            setPage(1);
            navigate(`/movies/${movie}/1`);
        }
    }

    function handleSearchClick() {
        setSearch(!search);
        setPage(1);
        navigate(`/movies/${movie}/1`);
    }

    return (
        <HeaderContainer display={display}>
            <Logo src={logo} />
            <Search>
                <SearchInput
                    type="text"
                    placeholder="Search for movies or series"
                    value={movie}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setMovie(e.target.value)}
                >
                </SearchInput>
                <SearchButton onClick={handleSearchClick} />
            </Search>
            <Icons>
                <HomeButton onClick={() => navigate('/home')} />
                <HeartButton onClick={() => navigate('/favorites')} />
            </Icons>
        </HeaderContainer>
    )
}
export default Header;

const HeaderContainer = styled.div`
    display: ${props => props.display};
    position: fixed;
    top: 0;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 72px;
    background-color: #424242;
    color: white;   
    box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
`
const Search = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40%;
    padding-top: 10px;
`
const SearchInput = styled.input`
    width: 100%;
    height: 31px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    font-size: 16px;
    &:focus {
        outline: none;
        border: 1px solid #000;
    }
    @media (max-width: 700px) {
        ::placeholder,
        ::-webkit-input-placeholder {
            color: #FFF;
        }
    }
    
`

const SearchButton = styled(BiSearch)`
   font-size: 20px;
   color: #000;
   margin: 0 0 5px -25px;
   margin-bottom: 10px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`
const HomeButton = styled(AiFillHome)`
    font-size: 20px;
    color: #FFF;
    cursor: pointer;
    margin-right: 20px;
`
const HeartButton = styled(AiFillHeart)`
    font-size: 20px;
    color: #FFF;
    cursor: pointer;
`

const Logo = styled.img`
    width: 65px;
    height: 50px;
    margin-left: 60px;
    @media (max-width: 700px) {
        margin-left: 20px;
    }
`
const Icons = styled.div`
    margin-right: 50px;

    @media (max-width: 700px) {
        margin-right: 25px;
    }
`


