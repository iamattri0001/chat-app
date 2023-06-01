import { useState } from 'react';

import Picker from 'emoji-picker-react';

import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

import './ChatInput.css';

const ChatInput = ({ handleSendMsg }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPicker = () => {
        setShowPicker(!showPicker);
    }

    const handleEmojiClick = (em, ev) => {
        let message = msg + em.emoji; // Append the emoji to the current message
        console.log(message);
        setMsg(message);
    }

    const sendChat = (ev) => {
        ev.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    }
    return (
        <section className='grid grid-cols-[5%_95%] items-center bg-[#080420] p-[0_2rem] pb-[0.3rem]'>
            <div className="button-container flex items-center text-white gap-4">
                <div className="emoji relative">
                    <BsEmojiSmileFill className='text-[#ffff00c8] cursor-pointer text-[1.5rem]' onClick={handleEmojiPicker} />
                    {/* {showPicker && <Picker width={'320px'} height={'360px'} onEmojiClick={handleEmojiClick} />} */}
                </div>
            </div>
            <form onSubmit={(ev) => sendChat(ev)} className='w-full rounded-[2rem] flex items-center gap-8 bg-[#ffffff34]'>
                <input
                    type="text"
                    placeholder='Type your message here..'
                    className='w-[90%] h-[60%]  text-white border-none bg-transparent outline-none pl-4 text-lg selection:bg-[#a84fe4] rounded-full'
                    onChange={(ev) => { setMsg(ev.target.value) }} value={msg} />

                <button type='submit' className='p-[0.3rem_2rem] rounded-[2rem] flex items-center justify-center bg-[#a84fe4]'>
                    <IoMdSend className='text-white text-[2rem]' />
                </button>
            </form>
        </section>
    )
}

export default ChatInput;