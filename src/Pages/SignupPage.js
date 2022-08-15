import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import api from "../services/api";

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const SignUp = {
        email: email,
        password: password,
        name: name,
        image: image
    };

    function verify() {
        if (!email || !password || !confirmPassword || !name || !image) {
            setError('All fields are required');
            return false;
        }
        if (password.length < 10) {
            setError('Password must be at least 10 characters long');
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
        <SignupPage>
            <SignupForm onSubmit={sendRequest}>
                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <Input type="text" placeholder="Image" onChange={(e) => setImage(e.target.value)} />
                <Button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</Button>
                <p>{error}</p>
                <p>{success ? 'Successfully signed up!' : ''}</p>
                <p>Already have an account? <Link to="/">Sign In</Link></p>
            </SignupForm>
        </SignupPage>
    )
}

export default Signup;

const SignupPage = styled.div`
    display: flex;
`;

const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: black;
    color: white;
`;

const Input = styled.input`
    width: 200px;
    height: 30px;
    border: 1px solid white;
    border-radius: 5px;
    margin-bottom: 10px;
    color: white;
    background-color: black;
    font-size: 15px;
    padding-left: 10px;
`;

const Button = styled.button`
    width: 200px;
    height: 30px;
    border: 1px solid white;
    border-radius: 5px;
    margin-bottom: 10px;
    color: white;
    background-color: black;
    font-size: 15px;
    padding-left: 10px;
`;
