import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import SearchContext from '../Context/searchContext.js';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const image = localStorage.getItem('image');

function Header() {
    const { movie, setMovie, setSearch, search, setPage } = useContext(SearchContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [display, setDisplay] = useState("flex");

    useEffect(() => {
        (location.pathname === '/' || location.pathname === '/cadastro' || location.pathname === "/movie")
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

    return (
        <HeaderContainer display={display}>
            <Search>
                <SearchInput
                    type="text"
                    placeholder="Search"
                    value={movie}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setMovie(e.target.value)}
                >
                </SearchInput>
                <SearchButton onClick={
                    () => {
                        setSearch(!search);
                        setPage(1);
                        navigate(`/movies/${movie}/1`);
                    }
                } />
            </Search>

            <Profile src={image} />
        </HeaderContainer>
    )
}
export default Header;

const HeaderContainer = styled.div`
    display: ${props => props.display};
    position: fixed;
    top: 0;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 10vh;
    background-color: #f5f5f5;
    color: white;   
`
const Search = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 60%;
`
const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    font-size: 16px;
    &:focus {
        outline: none;
        border: 1px solid #000;
    }
`

const Profile = styled.img`
    position: absolute;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
`
const SearchButton = styled(BiSearch)`
   font-size: 20px;
   color: #000;
   margin: 0 0 5px -25px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`



