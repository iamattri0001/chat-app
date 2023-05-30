import React, { useEffect, useState } from 'react'
import Loader from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { Buffer } from 'buffer';
import { toastOptions } from '../utils/toastSettings';

const SetAvatar = () => {
    const avatarAPI = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);


    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an avatar', toastOptions);
            return;
        }
        const userData = JSON.parse(localStorage.getItem('chat-app-user'));
        const { data } = await axios.post(setAvatarRoute, { ...userData, image: avatars[selectedAvatar] });
        if (data.isSet) {
            userData.isAvatarSet = true;
            userData.avatar = avatars[selectedAvatar];
            localStorage.setItem('chat-app-user', JSON.stringify(userData));
            navigate('/');
        } else {
            toast.error("Couldn't set avatar, try again", toastOptions);
        }
    }

    const fetchAvatars = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${avatarAPI}/${Math.round(Math.random() * 1000)}?apikey=F5CiL1GVwBvo9Z`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
    }
    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        } else {
            fetchAvatars();
        }
    }, []);

    return (
        <> {isLoading ? <div className='h-screen w-screen flex items-center justify-center bg-[#131324]'>
            <img src={Loader} className='h-fit' alt='loader' />
        </div> :
            <section className={'flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen'}>
                <div>
                    <h1 className='text-white text-4xl text-center'>
                        Pick an Avatar as your profile picture
                    </h1>
                </div>
                <div className='flex gap-8 flex-wrap items-center justify-center'>{
                    avatars.map((avatar, index) => (
                        <div key={index} className={`cursor-pointer p-[0.4rem] rounded-[5rem] flex items-center justify-center transition duration-500 ease-in-out ${selectedAvatar === index ? `scale-125` : ``}`}>
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' onClick={() =>
                                setSelectedAvatar(index)
                            } className='h-24' />
                        </div>
                    ))
                }</div>
                <button className='bg-[#997af0] text-white transition-all ease-in-out duration-300 py-[1rem] pb-3 px-[2rem] border-none font-bold cursor-pointer rounded-[0.4rem] uppercase hover:bg-[#4e0eff]' onClick={setProfilePicture}>Set as profile <picture></picture></button>
            </section>
        }
            <ToastContainer toastStyle={{ background: '#4E0EFF' }} />
        </>
    )
}

export default SetAvatar