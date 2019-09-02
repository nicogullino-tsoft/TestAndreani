import * as React from 'react';
import { Form, Grid, Message } from 'semantic-ui-react';
import ContentModalPasswordProps from './ContentModalPasswordProps';
import ContentModalPasswordState from './ContentModalPasswordState';
import axios from '../../api';

const btnHiden = require('../../components/buttons/img/hide.png');
const btnView = require('../../components/buttons/img/view.png');
const hiden = {
    background: `url(${btnHiden}) no-repeat center`
};

const view = {
    background: `url(${btnView}) no-repeat center`
};
const errorInput = {
    backgroundColor: '#fff6f6',
    borderColor: '#e0b4b4',
    color: '#9f3a38',
    boxShadow: 'none'
};

class ContentModalPassword extends React.Component<ContentModalPasswordProps, ContentModalPasswordState> {

    constructor(props: ContentModalPasswordProps) {
        super(props);
        this.state = {
            // id: this.props.userId,
            newPassword: '',
            confirmPassword: '',
            hiddenNew: true,
            hiddenConfirm: true,
            error: null
        };

        this.handlerInputPassword = this.handlerInputPassword.bind(this);
        this.savePassword = this.savePassword.bind(this);
    }

    public componentDidMount() {
        this.props.receiveAction(this.savePassword);
    }

    public handlerInputPassword(e: any) {
        // this.setState({ [e.currentTarget.name]: e.currentTarget.value });
        // this.props.disableBtn(false);
        switch (e.currentTarget.name) {
            case 'newPassword':
                this.setState({ newPassword: e.currentTarget.value });
                break;
            case 'confirmPassword':
                this.setState({ confirmPassword: e.currentTarget.value });
                break;
            default:
                console.log(e.currentTarget.value);
                break;
        }
    }

    // Método que ejecuta el alta y la edición de Proveedores
    public savePassword() {
        if (this.state.newPassword !== this.state.confirmPassword) {
            // this.setState({ error: 'Incomplete or erroneous fields' });
            return axios.put('/users/password', null);
        } else {
            const password = this.state.newPassword;
            return axios.put('/users/password', password);
        }
    }

    public seePaswordNew = () => {
        this.setState({ hiddenNew: !this.state.hiddenNew });
    }

    public seePaswordConfirm = () => {
        this.setState({ hiddenConfirm: !this.state.hiddenConfirm });
    }

    public closeMsg = () => {
        this.setState({ error: null });
        // this.props.disableBtn(false);
    }

    public render() {
        return (
            <div >
                <Form>
                    <Grid verticalAlign="middle" columns="equal">
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Form.Field required>
                                    <label>New Password</label>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <input
                                    data-style={!this.state.newPassword ? errorInput : null}
                                    type={this.state.hiddenNew ? 'password' : 'text'}
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    placeholder="New Password"
                                    onChange={this.handlerInputPassword} />
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <button
                                    className="btnPassword"
                                    style={this.state.hiddenNew ? hiden : view}
                                    onClick={this.seePaswordNew}>
                                </button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Form.Field required>
                                    <label>Confirm Password</label>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <input
                                    data-style={!this.state.confirmPassword ? errorInput : null}
                                    type={this.state.hiddenConfirm ? 'password' : 'text'}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handlerInputPassword} />
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <button
                                    className="btnPassword"
                                    style={this.state.hiddenConfirm ? hiden : view}
                                    onClick={this.seePaswordConfirm}>
                                </button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                {this.state.error ?
                    <Message negative onDismiss={this.closeMsg}>
                        <Message.Header>Ups error! {this.state.error}</Message.Header>
                    </Message> : null}
            </div>
        );
    }
}

export default ContentModalPassword;
