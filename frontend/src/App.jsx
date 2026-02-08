import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/login.jsx'
import Register from './components/register/register.jsx'
import Header from './components/header/header.jsx'
import Upload from './components/upload_pdf/upload.jsx'

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Header />} />
          <Route path="/dashboard/upload" element={<Upload />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
