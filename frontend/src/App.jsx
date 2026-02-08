import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/login.jsx'
import Register from './components/register/register.jsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
