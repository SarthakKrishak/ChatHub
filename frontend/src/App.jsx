import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes,Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import SettingsPage from './Pages/SettingPage'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader } from 'lucide-react';
import { Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  console.log({ authUser });
  
  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className='size-10 animate-spin' />
    </div>
  )
  

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={ authUser? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" />}/>
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App