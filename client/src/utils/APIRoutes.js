export const host = "https://chatter-box-ei8h.onrender.com";

//AUTH
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const verifyRoute = `${host}/api/auth/verify`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getAllUsers = `${host}/api/auth/allusers`;

//MESSAGES
export const sendMessageRoute = `${host}/api/message/addmsg`;
export const getAllMessgesRoute = `${host}/api/message/getmsgs`