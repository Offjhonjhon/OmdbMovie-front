import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import api from "../services/api";
import logo from '../assets/logo.png'
import CustomizedSnackbars from "../Components/Errors/error";
import ThreeDotsLoader from '../Components/Loader/ThreeDotsLoader.js'


function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const Login = {
        email: email,
        password: password
    };

    async function sendRequest(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const response = await axios.post(api.dbUrl + '/sign-in', Login);
            if (response.status === 200) {
                setSuccess(true);
                setLoading(false);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', JSON.stringify(response.data.name));
                navigate('/home');
            }
        }
        catch {
            setError('Invalid email or password');
            setLoading(false);
        }
    }

    return (
        <>
            <SigninForm onSubmit={sendRequest}>
                <Logo src={logo}></Logo>
                <Label HTMLFor='email'>Endereço de e-mail</Label>
                <Input type="email"  name="email" onChange={(e) => setEmail(e.target.value)} />
                <Label HTMLFor='password'>Senha</Label>
                <Input type="password" name="password"  onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" disabled={loading}>{loading ? <ThreeDotsLoader size='30'/> : 'Sign In'}</Button>
                {error ? <CustomizedSnackbars error={error} /> : <></>}
                <p><StyledLink to="/signup">New user?</StyledLink></p>
            </SigninForm>
        </>
    )
}

export default Signin;

const SigninForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 892px;
    height: 634px;
    background-color: #FFF;
    border-radius: 15px;

    @media screen and (max-width: 767px){
        width: 300px;
    }
`;

const Input = styled.input`
    width: 40%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #978D8D;
    font-size: 16px;
    margin-bottom: 20px;
    background-color: #fff;
    transition: 0.5s;
    &:focus {
        outline: none;
        border: 1px solid #000;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    &::placeholder,
    ::-webkit-input-placeholder {
        background-color: #fff;
    }

    @media screen and (max-width: 767px){
        width: 85%;
    }
`;

const Button = styled.button`
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: none;
    font-size: 15px;
    color: #fff;
    margin-top: 15px;
    margin-bottom: 30px;
    background-color: #1976d2;
    &:hover {
        transition: 0.8s;
        background-color: #0A3F75;
        cursor: pointer;
    } 

    &:focus {
        outline: none;
    }
`;

const Logo = styled.img`
    width: 192px;
    height: 192px;
`
const Label = styled.label`
    @import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');

    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 15px;
    width: 40%;
    margin-bottom: 10px;
    margin-top: 15px;
    
    @media screen and (max-width: 767px){
        width: 85%;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #C3C9CE;
    font-size: 20px;

    &:hover {
        transition: 0.8s;
        color: #3F4952;
    }
`