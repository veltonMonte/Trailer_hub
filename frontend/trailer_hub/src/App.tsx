import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/Login'
import Trailer from './pages/Trailer'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Categories from './pages/Categories'
import Navbar from './components/Navbar'

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trailers/:id" element={<Trailer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App