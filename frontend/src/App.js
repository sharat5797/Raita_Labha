import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import UserLogin from './UserLogin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/userlogin"  component={UserLogin} />
        <Route path="/adminlogin"  component={AdminLogin} />
        <Route path="/adminPage"  component={AdminPage} />
        {/* Add other routes here if needed */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
