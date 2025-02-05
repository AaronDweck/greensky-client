import './App.css'
import { Routes, Route, NavLink } from 'react-router'
import Feed from './components/Feed/Feed'
import Post from './components/Post/Post'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

function App() {

  return (
    <>
      <nav>
        <NavLink to='/'>Feed</NavLink>
        <NavLink to='/post/fakeId'>Post</NavLink>
        <NavLink to='/signup'>Signup</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </nav>

      <Routes>
        <Route path='/' element={<Feed />}/>
        <Route path='/post/:postId' element={< Post/>}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>

    </>
  )
}

export default App
