import React from 'react';
import {HashRouter as Router,Routes,Route,Outlet} from 'react-router-dom';
import Home from './page/Home';

const Layout = ()=>{
 return <div>
    
    <Outlet />
  </div>
}

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='home' element={<Home />} />

          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
