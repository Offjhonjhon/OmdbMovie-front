import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import api from "../services/api";
import logo from '../assets/logo.png'
import CustomizedSnackbars from "../Components/Errors/error.js";
import ThreeDotsLoader from "../Components/Loader/ThreeDotsLoader.js";


function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const SignUp = {
        email: email,
        password: password,
        name: name
    };

    function verify() {
        if (!email || !password || !confirmPassword || !name) {
            setError('All fields are required');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    }

    async function sendRequest(e) {
        e.preventDefault();
        console.log(error)

        if (verify()) {
            setLoading(true);
            setError('');
            setSuccess(false);
            try {
                const response = await axios.post(api.dbUrl + '/sign-up', SignUp);
                if (response.status === 200) {
                    setSuccess(true);
                    setLoading(false);
                    navigate('/');
                }
            }
            catch (error) {
                if (error.response.status === 409) {
                    setError('Email already exists');
                }
                else {
                    setError('Something went wrong');
                }
                setLoading(false);
            }
        }
    }

    return (
        <>
            <SignupForm onSubmit={sendRequest}>
                <Logo src={logo}></Logo>
                <Label HTMLFor='email'>Email address</Label>
                <Input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <Label HTMLFor='password'>Password (at least 6 characters)</Label>
                <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <Label HTMLFor='confirmPassword'>Confirm password</Label>
                <Input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                <Label HTMLFor='userName'>User name</Label>
                <Input type="text" name="userName" onChange={(e) => setName(e.target.value)} />
                <Button type="submit" disabled={loading}>{loading ? <ThreeDotsLoader size='30px' /> : 'Sign Up'}</Button>
                {error ? <CustomizedSnackbars error={error} /> : <></>}
                <p><StyledLink to="/">Already have an account?</StyledLink></p>
            </SignupForm>
        </>
    )
}

export default Signup;

const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 700px;
    height: 634px;
    background-color: #FFF;
    border-radius: 15px;
    margin: auto;
    
    @media screen and (max-width: 767px){
        width: 300px;
    }

    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

const Input = styled.input`
    width: 60%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #978D8D;
    font-size: 16px;
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
    margin-top: 25px;
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
    width: 60%;
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