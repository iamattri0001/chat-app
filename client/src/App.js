import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loader from '../src/assets/loader.gif'

const Chat = lazy(() => import('./pages/Chat'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const SetAvatar = lazy(() => import('./pages/SetAvatar'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='h-screen w-screen flex items-center justify-center bg-[#131324]'>
        <img src={Loader} className='h-fit' alt='loader' />
      </div>}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
          <Route path='/' element={<Chat />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App