import React, { useEffect, useState } from 'react'

import Logo from '../assets/logo.svg'

import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../utils/toastSettings';

import axios from 'axios';
import { loginRoute, verifyRoute } from '../utils/APIRoutes';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        async function verify() {
            if (localStorage.getItem('chat-app-user')) {
                const userDetails = await JSON.parse(localStorage.getItem('chat-app-user'));
                const { data } = await axios.post(verifyRoute, userDetails);
                if (data.isTokenValid) {
                    navigate('/');
                }
            }
        }
        verify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!handleValidation())
            return;
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
            username, password
        })
        if (data.status === false) {
            toast.error(data.message, toastOptions);
            return;
        }
        localStorage.setItem('chat-app-user', JSON.stringify(data.userDetails));
        navigate('/');
    }

    const handleChange = (ev) => {
        setValues({ ...values, [ev.target.name]: ev.target.value });
    }

    const handleValidation = () => {
        const { username, password } = values;
        if (username.length === 0) {
            toast.error("Email and Password are required", toastOptions);
            return false;
        }
        else if (password.length === '') {
            toast.error("Email and Password are required", toastOptions);
            return false;
        }
        return true;
    }

    return (
        <>
            <section className='h-screen w-screen flex flex-col items-center justify-center gap-[1rem] bg-[#131324]'>
                <form onSubmit={(ev) => handleSubmit(ev)} className='flex flex-col gap-[2rem] bg-[#00000076] rounded-[2rem] px-[5rem] py-[3rem]' autoComplete='off'>
                    <div className='flex items-center gap-[1rem] justify-center'>
                        <img src={Logo} alt='Logo' className='h-[5rem]' />
                        <h1 className='text-white uppercase'>Chatter Box</h1>
                    </div>
                    <input
                        type="text"
                        name='username'
                        placeholder='Username'
                        onChange={(ev) => handleChange(ev)}
                        min={3}
                        className='bg-transparent p-[1rem] border-[0.1rem] border-[#4E0EFF] rounded-[0.4rem] text-white w-full focus:border-[#997af0] focus:outline-none'
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        onChange={(ev) => handleChange(ev)}
                        className='bg-transparent p-[1rem] border-[0.1rem] border-[#4E0EFF] rounded-[0.4rem] text-white w-full focus:border-[#997af0] focus:outline-none'
                    />

                    <button type='submit' className='bg-[#997af0] text-white transition-all ease-in-out duration-300 py-[1rem] pb-3 px-[2rem] border-none font-bold cursor-pointer rounded-[0.4rem] uppercase hover:bg-[#4e0eff]'>Login</button>

                    <span className='uppercase text-white text-center'>Don't have an account? <Link className='text-[#4e03ff]' to='/register'>Register</Link> </span>
                </form>
            </section>
            <ToastContainer toastStyle={{ background: '#4E0EFF' }} />
        </>
    )
}
export default Login