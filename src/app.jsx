//dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { push } from 'react-router-redux';
// import axios from 'axios';
import store from './store/store';
// import Header from './components/header/header';
import LoginView from './pages/login/loginView';
import RepositoriesView from './pages/repository/repositoriesView';
import ProjectsView from './pages/project/projectsView';
import Content from './components/pageContent/content';
import ProvidersView from './pages/providers/providersView';
import CredentialView from './pages/credentials/credentialView';
import RolesView from './pages/roles/rolesView';
import UsersView from './pages/users/usersView';
import ScanHistoryView from './pages/history/ScanHistoryView';
//import AbmView from './components/abm/abmView';



class App extends React.Component {

  componentWillReceivedProps(nextProps) {
    if (nextProps.redirecTo) {
      store.dispatch(push(nextProps.redirecTo));
    }
  }

  render() {
    let AppRoutes = (
      <div className="App">
        {/* <Header {...this.props} /> */}
        <Switch>
          <Route path="/" render={(props) => {
            if (localStorage.getItem('accessToken') !== null) {
              switch (props.location.pathname) {
                case '/repositories':
                  return <Content title="Repositories"><RepositoriesView /></Content>;
                case '/project':
                  return <Content title="Project"><ProjectsView /></Content>;
                case '/providers':
                  return <Content title="Providers"><ProvidersView /></Content>;
                case '/credential':
                  return <Content title="Credentials"><CredentialView /></Content>;
                case '/roles':
                  return <Content title="Roles"><RolesView /></Content>;
                case '/users':
                  return <Content title="Users"><UsersView /></Content>;
                case '/history':
                  return <Content title="Scan history"><ScanHistoryView /></Content>;
                default:
                  return <Content />;
              }
            } else {
              return <LoginView />;
            }
          }} />
          {/* <Route path="/login" component={LoginView} />
          <Route path="/repositories" render={(props) => <Content title="Repositories"><RepositoriesView /></Content>} />
          <Route path="/project" render={(props) => <Content title="Project"><ProjectsView /></Content>} />
          <Route path="/providers" render={(props) => <Content title="Providers"><ProvidersView /></Content>} />
          <Route exact path="/credential" render={(props) => <Content title="Credentials"><CredentialView /></Content>} />
          <Route exact path="/roles" render={(props) => <Content title="Roles"><RolesView /></Content>} />
          <Route exact path="/users" render={(props) => <Content title="Users"><UsersView /></Content>} />*/}

        </Switch>
      </div>
    )
    return AppRoutes;

  }
}

const mapStateToProps = (state, props) => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: 'REDIRECT' }),
  onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
