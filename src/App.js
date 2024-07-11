import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './main-page/main-page'
import MovieSearch from './main-page/main-page-show-logic-work/movie-search/movie-search'
import ToDoList from './main-page/main-page-show-logic-work/to-do-list/to-do-list';
import LeapToRiches from './main-page/main-page-show-logic-work/leap-to-riches/leap-to-riches';
import ShopAreaLeapToRiches from './main-page/main-page-show-logic-work/leap-to-riches/shop-area-leap-to-riches/shop-area-leap-to-riches';
import AllCompaniesLeapToRiches from './main-page/main-page-show-logic-work/leap-to-riches/all-companies-leap-to-riches/all-companies-leap-to-riches';

function App() {
  return (
    <Router>
      <div className='BOSS'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/movie-searcher' element={<MovieSearch />}></Route>
          <Route path='/to-do-list' element={<ToDoList />}></Route>
          <Route path='/leap-to-riches' element={<LeapToRiches />}></Route>
          <Route path='/leap-to-riches/shop-area' element={<ShopAreaLeapToRiches />}></Route>
          <Route path='/leap-to-riches/all-companies' element={<AllCompaniesLeapToRiches />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
