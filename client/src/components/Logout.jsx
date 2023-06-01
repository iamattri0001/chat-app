import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div onClick={handleClick} className='flex justify-center items-center p-2 rounded-lg bg-[#a84fe4] cursor-pointer'>
            <BiPowerOff className='text-[#ebe7ff] text-xl' />
        </div>
    )
}

export default Logout