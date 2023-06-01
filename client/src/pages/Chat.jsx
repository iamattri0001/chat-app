import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { verifyRoute, getAllUsers } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";


const Chat = () => {
    const [contacts, setContacts] = useState([]);
    const [user, setUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        async function verify() {
            if (localStorage.getItem('chat-app-user')) {
                const userDetails = await JSON.parse(localStorage.getItem('chat-app-user'));
                const { data } = await axios.post(verifyRoute, userDetails);
                if (data.isTokenValid) {
                    const userDetails = await JSON.parse(localStorage.getItem('chat-app-user'));
                    setUser(userDetails);
                    if (!userDetails.avatarImage) {
                        navigate('/setAvatar')
                    } else {
                        setIsUserLoaded(true);
                        navigate('/');
                    }
                } else {
                    navigate('/login');
                }
            }
            else {
                navigate('/login');
            }
        }
        verify();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user) {
            const fetchUsers = async () => {
                const { username, token } = user;
                const { data } = await axios.post(getAllUsers, { username, token });
                if (!data.status) {
                    setContacts(data);
                }
            }
            fetchUsers();
        }
    }, [user]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }
    return (
        <section className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-[#131324]">
            <div className="h-[85vh] w-[85vw] bg-[#00000076] grid grid-cols-[25%_75%]">
                {isUserLoaded &&
                    (<>
                        <div>
                            <Contacts
                                contacts={contacts}
                                user={user}
                                changeChat={handleChatChange}
                            />
                        </div>
                        {currentChat ?
                            <ChatContainer currentChat={currentChat} user={user} />
                            :
                            <Welcome user={user} />
                        }
                    </>
                    )}
            </div>
        </section>
    )
}

export default Chat