import Robot from '../assets/robot.gif';

const Welcome = ({ user }) => {
    return (
        <section className='flex justify-center items-center flex-col text-purple-100'>
            <img src={Robot} alt="Robot" className='h-80' />
            <h1 className='text-4xl'>Welcome, <span className='text-[#4e0eff]'>{user.username}</span></h1>
            <h3 className='text-lg text-gray-400'>Please select a chat to Start Messaging</h3>
        </section>
    )
}

export default Welcome