import './App.css'
import { Route, BrowserRouter, Routes } from "react-router";
import Home from './pages/Home';

function App() {

  return (
    <div className='main w-full h-full bg-green-400 brightness-85'>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
