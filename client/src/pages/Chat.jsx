import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { verifyRoute } from "../utils/APIRoutes";

const Chat = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function verify() {
            if (localStorage.getItem('chat-app-user')) {
                const userDetails = await JSON.parse(localStorage.getItem('chat-app-user'));
                const { data } = await axios.post(verifyRoute, userDetails);
                if (data.isTokenValid)
                    navigate('/');
            }
        }
        verify();
    }, [])
    return (
        <div>Chat</div>
    )
}

export default Chat