import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'


function App() {

  return (
    <>
    <ToastContainer position='top-right' theme='colored'/>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
