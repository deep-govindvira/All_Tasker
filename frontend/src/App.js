import './App.css';
import Home from './home/Home';
import Todo from './todo/Todo';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Expense from './expense/Expense';
import Note from './note/Note';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar/>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Todo' element={<Todo />} />
          <Route path='/Note' element={<Note />} />
          <Route path='/Expense' element={<Expense />} />
        </Routes>
      </BrowserRouter>
      <div className="fixed-bottom bg-dark text-light">Deep Govindvira © 2024</div>
    </div>
  );
}

export default App;
