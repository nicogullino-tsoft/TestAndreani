// import { connect } from 'react-redux';
import * as React from 'react';
import '../../components/abm/stylesAbm.css';
import axios, { setCurrentToken } from '../../api';
// import store from '../../store/store';
// import * as actions from '../../actions/actions';
import { Grid, Header } from 'semantic-ui-react';
import { Login } from '@tsoft/login/dist/lib';
import { withRouter } from 'react-router-dom';
// import LoginViewProps from './LoginViewProps';
import LoginViewState from './LoginViewState';
import UserPassCredential from '@tsoft/login/dist/lib/login/UserPassCredential';
import ContentModalForgotPass from './contentModalForgotPass';

class LoginView extends React.Component<any, LoginViewState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            error: null,
            showModal: false,
            saveRecordModel: null
        };
        this.loginUser = this.loginUser.bind(this);
        this.redirectLogin = this.redirectLogin.bind(this);
    }

    public saveRecord = () => this.state.saveRecordModel();

    public receiveAction = (saveRecordChild: any) => {

        this.setState({ saveRecordModel: saveRecordChild });
    }

    public render() {
        return (
            <div className="componentLogin" >
                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Header as="h2" textAlign="center">
                                <h2 className="texto">Dev<span className="texto2">S</span>core</h2>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {/* <div className="componentLogin"> */}
                        <Login
                            performLogin={this.loginUser}
                            userAuthorized={this.redirectLogin}
                            userLabel="User"
                            passwordLabel="Password" />
                        {/* </div> */}
                    </Grid.Row>
                    <Grid.Row>
                        <button
                            className="forgotPass"
                            onClick={this.changePassword}>
                            Forgot my password
                        </button>
                        {this.state.showModal &&
                            <ContentModalForgotPass
                                close={this.close}
                                showModal={this.state.showModal}
                            />}
                    </Grid.Row>
                </Grid>
            </div >
        );
    }

    /**
     * Funcion que devuelve una promesa que obtiene el token del usuario.
     * @param userData credenciales del usuario.
     */

    private loginUser(userData: UserPassCredential): Promise<void> {
        const data = {
            password: userData.password,
            username: userData.user
        };
        return axios.post('/users/authenticate', data).then((r) => {
            const token: string = r.data.accessToken;
            localStorage.setItem('accessToken', token);
            setCurrentToken(token);
        });
    }

    private redirectLogin(user: string): void {
        this.props.history.push('/');
    }

    private changePassword = () => {
        this.setState({ showModal: true });
    }

    private close = () => {
        this.setState({ showModal: false });
    }
}
export default withRouter(LoginView);

// /**
//  * Funcion que obtine el token guardado en el localStorage de la sesion iniciada y lo devuelve.
//  */
// export function obtainToken() {
//     const currentToken = localStorage.getItem('accessToken');
//     return currentToken;
// }