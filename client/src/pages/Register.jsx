import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute, verifyRoute } from '../utils/APIRoutes';
import { toastOptions } from '../utils/toastSettings';

const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    useEffect(() => {
        async function verify() {
            if (localStorage.getItem('chat-app-user')) {
                const userDetails = await JSON.parse(localStorage.getItem('chat-app-user'));
                const { data } = await axios.post(verifyRoute, userDetails);
                if (data.isTokenValid)
                    navigate('/');
            }
            else {
                navigate('/register');
            }
        }
        verify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!handleValidation())
            return;
        const { username, password, email } = values;
        const { data } = await axios.post(registerRoute, {
            username, password, email
        })
        if (data.status === false) {
            toast.error(data.message, toastOptions);
            return;
        }
        localStorage.setItem('chat-app-user', JSON.stringify(data));
        navigate('/');
    }

    const handleChange = (ev) => {
        setValues({ ...values, [ev.target.name]: ev.target.value });
    }

    const handleValidation = () => {
        const { username, password, email, confirmPassword } = values;
        if (username.length < 3) {
            toast.error("Username should contain atleast 3 characters", toastOptions);
            return false;
        }
        else if (password.length < 8) {
            toast.error("Password should contain atleast 8 characters", toastOptions);
            return false;
        }
        else if (email === '') {
            toast.error("Email is required.", toastOptions);
            return false;
        }
        else if (password !== confirmPassword) {
            toast.error("Both passwords should match", toastOptions);
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
                        <h1 className='text-white uppercase'>Snappy</h1>
                    </div>
                    <input
                        type="text"
                        name='username'
                        placeholder='Username'
                        onChange={(ev) => handleChange(ev)}
                        className='bg-transparent p-[1rem] border-[0.1rem] border-[#4E0EFF] rounded-[0.4rem] text-white w-full focus:border-[#997af0] focus:outline-none'
                    />
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        onChange={(ev) => handleChange(ev)}
                        className='bg-transparent p-[1rem] border-[0.1rem] border-[#4E0EFF] rounded-[0.4rem] text-white w-full focus:border-[#997af0] focus:outline-none'
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        onChange={(ev) => handleChange(ev)}
                        className='bg-transparent p-[1rem] border-[0.1rem] border-[#4E0EFF] rounded-[0.4rem] text-white w-full focus:border-[#997af0] focus:outline-none'
                    />
                    <input
                        type="password"
                        name='confirmPassword'
                        placeholder='Confirm password '
                        onChange={(ev) => handleChange(ev)}
                        className='bg-transparent p-[1rem] border-[0.1rem] border-[#4E0EFF] rounded-[0.4rem] text-white w-full focus:border-[#997af0] focus:outline-none'
                    />

                    <button type='submit' className='bg-[#997af0] text-white transition-all ease-in-out duration-300 py-[1rem] pb-3 px-[2rem] border-none font-bold cursor-pointer rounded-[0.4rem] uppercase hover:bg-[#4e0eff]'>Create User</button>

                    <span className='uppercase text-center text-white'>Alrady have an account? <Link className='text-[#4e03ff]' to='/login'>Login</Link> </span>
                </form>
            </section>
            <ToastContainer toastStyle={{ background: '#4E0EFF' }} />
        </>
    )
}
export default Register