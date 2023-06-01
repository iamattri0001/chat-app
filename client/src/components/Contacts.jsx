import { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg'
import './Contacts.css';
import Logout from './Logout';

const Contacts = ({ contacts, user, changeChat }) => {
    const [username, setUsername] = useState(undefined);
    const [userImage, setUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
        if (user) {
            setUserImage(user.avatarImage);
            setUsername(user.username);
        }
    }, [user]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }
    return (
        <>
            {
                userImage && username && (
                    <section className='grid grid-rows-[10%_75%_15%] overflow-hidden h-full bg-[#080420] rounded-[inherit]'>
                        <div className='flex items-center justify-center gap-4'>
                            <img className='h-8' src={Logo} alt='logo' />
                            <h3 className='uppercase text-white'>Snappy</h3>
                        </div>
                        <div className='flex flex-col items-center overflow-auto gap-3 hide-scrollbar'>
                            {
                                contacts.map((contact, index) => (
                                    <div key={index} className={`text-purple-50 min-h-[5rem] w-[90%] cursor-pointer rounded-[.2rem] p-2 flex items-center gap-x-4 transition-all duration-500 ease-in-out ${currentSelected === index ? `bg-[#a84fe4]` : `bg-[#ffffff39]`}`}
                                        onClick={() => { changeCurrentChat(index, contact) }}>
                                        <div>
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar' className='h-12' />
                                        </div>
                                        <div>
                                            <h2>{contact.username}</h2>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='bg-[#0d0d30] flex justify-between px-5 items-center gap-8'>
                            <div className='flex items-center gap-4'>
                                <div className='rounded-full border-2 border-[#ccc3c3] '>
                                    <img src={`data:image/svg+xml;base64,${userImage}`} alt='avatar' className='h-12' />
                                </div>
                                <div>
                                    <h2 className='text-purple-100 text-2xl'>{username}</h2>
                                </div>
                            </div>
                            <Logout />
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default Contacts