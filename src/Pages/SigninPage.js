import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import api from "../services/api";


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
                localStorage.setItem('image', response.data.image);
                navigate('/home');
            }
        }
        catch {
            setError('Invalid email or password');
            setLoading(false);
        }
    }

    return (
        <SigninPage>
            <SigninForm onSubmit={sendRequest}>
                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</Button>
                <p>{error}</p>
                <p>{success ? 'Successfully signed in!' : ''}</p>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </SigninForm>
        </SigninPage>
    )
}

export default Signin;

const SigninPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: black;
    color: white;
`;

const SigninForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    color: red;
`;

const Input = styled.input`
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
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;
