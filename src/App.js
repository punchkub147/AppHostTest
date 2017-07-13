import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { MuiThemeProvider } from 'material-ui/styles';
import './style/style.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Topics from './pages/Topics';
import Login from './pages/Login';
import ItemCreate from './pages/Item/Create';
import ItemEdit from './pages/Item/Edit';
import UserProfile from './pages/User/Profile';

class App extends Component {

  render() {

    const routes = [
      { path: '/',
        exact: true,
        header: Header,
        content: Home,
        footer: Footer,
      },
      { path: '/item/create',
        exact: false,
        header: Header,
        content: ItemCreate,
        footer: Footer,
      },
      { path: '/about',
        exact: false,
        header: Header,
        content: About,
        footer: Footer,
      },
      { path: '/topics',
        exact: false,
        header: Header,
        content: Topics,
        footer: Footer,
      },
      { path: '/login',
        exact: false,
        header: Header,
        content: Login,
        footer: Footer,
      },
      { path: '/user/profile',
        exact: false,
        header: Header,
        content: UserProfile,
        footer: Footer,
      },
      { path: '/item/edit/',
        exact: false,
        header: Header,
        content: ItemEdit,
        footer: Footer,
      },
    ]
    
    return (
      <MuiThemeProvider>
        <div id="App">
          <Router>
              <div>
                {routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.header}
                  />
                ))}
                <div id="Content">
                  {routes.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      exact={route.exact}
                      component={route.content}
                    />
                  ))}
                </div>
                {routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.footer}
                  />
                ))}
              </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
