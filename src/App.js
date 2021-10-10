import React from 'react';
// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Components
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound'

//styles
import { GlobalStyle } from './GlobalStyle'
// change <Home></Home> to route by wrapping
// create route for movieId
// create route for NotFound
// move from normal function (which has return statement) to arrow function
const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:movieId' element={<Movie />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
    <GlobalStyle />
  </Router>
);

export default App;
