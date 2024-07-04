import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './main-page/main-page'
import MovieSearch from './main-page/main-page-show-logic-work/movie-search/movie-search'
import ToDoList from './main-page/main-page-show-logic-work/to-do-list/to-do-list';

function App() {
  return (
    <Router>
      <div className='BOSS'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/movie-searcher' element={<MovieSearch />}></Route>
          <Route path='/to-do-list' element={<ToDoList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
