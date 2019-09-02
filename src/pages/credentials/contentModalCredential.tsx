import * as React from 'react';
import { Form, Grid, Message } from 'semantic-ui-react';
import ContentModalCredentialProps from './ContentModalCredentialProps';
import ContentModalCredentialState from './ContentModalCredentialState';

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

class ContentModalCredential extends React.Component<ContentModalCredentialProps, ContentModalCredentialState> {

    constructor(props: ContentModalCredentialProps) {
        super(props);
        this.state = {
            enabled: false,
            id: this.props.credentialId,
            name: '',
            username: '',
            password: '',
            hidden: true,
            error: null
        };

        this.handlerInputCredential = this.handlerInputCredential.bind(this);
        this.saveCredential = this.saveCredential.bind(this);
    }

    public componentDidMount() {
        this.props.receiveAction(this.saveCredential);
        if (this.props.credentialId != null) {
            this.props.getRecordById(this.props.credentialId).then((data: any) => {
                if (data) {
                    this.setState({
                        enabled: data.enabled,
                        id: data.id,
                        name: data.name,
                        username: data.username
                    });
                }
            }).catch((error: any) => {
                if (error.response.data.message) {
                    this.setState({ error: error.response.data.message });
                } else {
                    this.setState({ error });
                }
            });
        }
    }

    public handlerInputCredential(e: any) {
        // this.setState({ [e.currentTarget.name]: e.currentTarget.value });
        this.props.disableBtn(false);
        switch (e.currentTarget.name) {
            case 'name':
                this.setState({ name: e.currentTarget.value });
                break;
            case 'username':
                this.setState({ username: e.currentTarget.value });
                break;
            case 'password':
                this.setState({ password: e.currentTarget.value });
                break;
            default:
                console.log(e.currentTarget.value);
                break;
        }
    }

    // Método que ejecuta el alta y la edición de Proveedores
    public saveCredential() {
        if (!(this.state.name && this.state.username)) {
            this.setState({ error: 'Incomplete or erroneous fields' });
        } else {

            if (this.state.id == null) {
                const datos = {
                    name: this.state.name,
                    password: this.state.password,
                    username: this.state.username
                };

                return this.props.postCredentials(datos);
            } else {
                const datos = {
                    enabled: this.state.enabled,
                    name: this.state.name,
                    password: this.state.password,
                    username: this.state.username
                };
                return this.props.putCredentials(this.state.id, datos);

            }
        }
    }

    public seePasword = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    public closeMsg = () => {
        this.setState({ error: null });
        this.props.disableBtn(false);
    }

    public render() {
        return (
            <div >
                <Form>
                    <Grid verticalAlign="middle" columns="equal">
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Form.Field required>
                                    <label>Credential Name</label>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <input
                                    data-style={!this.state.name ? errorInput : null}
                                    type="text" name="name"
                                    value={this.state.name}
                                    placeholder="Name"
                                    onChange={this.handlerInputCredential} 
                                    disabled={this.props.readOnly}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={6} id="inputUser">
                                <Form.Field required>
                                    <label>User Name</label>
                                </Form.Field>
                                <input
                                    data-style={!this.state.username ? errorInput : null}
                                    type="text" name="username"
                                    value={this.state.username}
                                    placeholder="User Name"
                                    onChange={this.handlerInputCredential} 
                                    disabled={this.props.readOnly}/>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Form.Field required>
                                    <label>Password</label>
                                </Form.Field>
                                <input
                                    data-style={!this.state.password ? errorInput : null}
                                    type={this.state.hidden ? 'password' : 'text'}
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handlerInputCredential}
                                    disabled={this.props.readOnly}/>
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <button
                                    className="btnPassword"
                                    style={this.state.hidden ? hiden : view}
                                    onClick={this.seePasword}>
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

export default ContentModalCredential;
