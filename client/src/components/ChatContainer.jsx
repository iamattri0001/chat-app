import { useState, useEffect, useRef } from 'react';

import { BiPhoneCall } from 'react-icons/bi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../utils/toastSettings';

import ChatInput from './ChatInput';

import { sendMessageRoute, getAllMessgesRoute } from '../utils/APIRoutes';

import axios from 'axios';

const ChatContainer = ({ currentChat, user, socket }) => {

    const [messages, setMessages] = useState([]);
    const [arrivedMessage, setArrivedMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        // setMessages([]);
        if (currentChat) {
            const fetchMessages = async () => {
                const { data } = await axios.post(getAllMessgesRoute, {
                    from: user.id,
                    to: currentChat._id,
                    username: user.username,
                    token: user.token
                });
                setMessages(data.messages);
            }
            fetchMessages();
        }
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        const { data } = await axios.post(sendMessageRoute, {
            message: msg,
            from: user.id,
            to: currentChat._id,
            token: user.token,
            username: user.username
        });

        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: user.id,
            message: msg
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', data => {
                if (data.from === currentChat._id) {
                    setArrivedMessage({ fromSelf: false, message: data.message });
                }
            });
        }
    }, []);

    useEffect(() => {
        arrivedMessage && setMessages((prev) => [...prev, arrivedMessage]);
    }, [arrivedMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
    }, [messages]);

    return (
        <section className='pt-4 grid grid-rows-[10%_78%_12%] overflow-hidden gap-1 '>
            <div className="chat-header flex justify-between items-center p-[0_2rem]">
                <div className='user-details flex items-center gap-4'>
                    <div className='avatar'>
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt='avatar' className='h-12' />
                    </div>
                    <div className="username">
                        <h3 className='text-purple-200 text-lg'>{currentChat.username}</h3>
                    </div>
                </div>
                <BiPhoneCall className='text-white cursor-pointer text-2xl' onClick={() => toast.error("Coming soon!", toastOptions)} />
            </div>

            <div className='p-[1rem_2rem] flex flex-col gap-4 overflow-auto'>
                {
                    messages.map((msg, index) => {
                        return (
                            <div key={index} ref={scrollRef}>
                                <div className={`flex items-center ${msg.fromSelf ? `justify-end` : `justify-start`}`}>
                                    <div className={`max-w-[40%] break-words p-[0.8rem_1rem] text-[1.1rem] rounded-2xl text-[#d1d1d1] ${msg.fromSelf ? `bg-[#51137aa8]` : 'bg-[#3712774c] '}`}>
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
            <ToastContainer toastStyle={{ background: '#4E0EFF', color: 'white' }} />
        </section>
    )
}

export default ChatContainer