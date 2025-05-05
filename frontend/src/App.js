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
import Chat from './chat/Chat';
import NoteAdd from './note/NoteAdd';
import NoteUpdate from './note/NoteUpdate';

function App() {
  const [isLoading, setisLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setIsLoggedIn(true);
    }
    setisLoading(false);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      const dayOfWeek = now.toLocaleString('en-us', { weekday: 'long' });
      const month = now.toLocaleString('en-us', { month: 'long' });
      const date = now.getDate();
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      const dateString = `${dayOfWeek}, ${month} ${date}, ${year}`;
      const timeString = `${hours}:${minutes}:${seconds}`;

      setCurrentDateTime(`${dateString} - ${timeString}`);
    };

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(intervalId);
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
    );
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
          <Route path='/Chat' element={isLoggedIn ? <Chat /> : <Navigate to="/login" />} />
          <Route path='/Note' element={isLoggedIn ? <Note /> : <Navigate to="/login" />} />
          <Route path='/Note/Add' element={isLoggedIn ? <NoteAdd /> : <Navigate to="/login" />} />
          <Route path='/Note/:id' element={isLoggedIn ? <NoteUpdate /> : <Navigate to="/login" />} />
          <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path='/register' element={<Register onLogin={setIsLoggedIn}/>} />
        </Routes>
      </BrowserRouter>
      
      <div style={styles.datetimeContainer}>
        {currentDateTime}
      </div>
      
      <div className="fixed-bottom bg-dark text-light">Deep Govindvira © 2025</div>
    </div>
  );
}

const styles = {
  datetimeContainer: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    fontSize: '1.0em',
    color: '#333',
    padding: '5px 10px',
    borderRadius: '5px',
  }
};

export default App;
