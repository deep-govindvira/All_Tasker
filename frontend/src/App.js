import './App.css';
import Home from './home/Home';
import Todo from './todo/Todo';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Expense from './expense/Expense';
import Note from './note/Note';
import { useEffect, useState } from 'react';
import Login from './login/Login';
import Register from './register/Register';
import Code from './code/Code';
import Draw from './draw/Draw';
import Search from './search/Search';

function App() {
  const [isLoading, setisLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setIsLoggedIn(true);
    }
    setisLoading(false)
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      setIsLoggedIn(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar isLoggedIn={isLoggedIn} onLoginLogout={handleLoginLogout} />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Todo' element={isLoggedIn ? <Todo /> : <Navigate to="/login" />} />
          <Route path='/Note' element={isLoggedIn ? <Note /> : <Navigate to="/login" />} />
          <Route path='/Expense' element={isLoggedIn ? <Expense /> : <Navigate to="/login" />} />
          <Route path='/Code' element={isLoggedIn ? <Code /> : <Navigate to="/login" />} />
          <Route path='/Draw' element={isLoggedIn ? <Draw /> : <Navigate to="/login" />} />
          <Route path='/Search' element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
          <Route path='/login' element={<Login onLogin={setIsLoggedIn} />} />
          <Route path='/register' element={<Register onLogin={setIsLoggedIn}/>} />
        </Routes>
      </BrowserRouter>
      <div className="fixed-bottom bg-dark text-light">Deep Govindvira © 2024</div>
    </div>
  );
}

export default App;