import * as React from 'react';
import { Dropdown, Form, Grid, Message, DropdownProps, Checkbox } from 'semantic-ui-react';
import ContentModalUsersState from './ContentModalUsersState';
import ContentModalUsersProps from './ContentModalUsersProps';

const authenticationTypes = [
    { key: 'local', text: 'LOCAL', value: 'local' },
    { key: 'ldap', text: 'LDAP', value: 'ldap' }
];

// const btnHiden = require('../../components/buttons/img/hide.png');
// const btnView = require('../../components/buttons/img/view.png');
// const hiden = {
//     background: `url(${btnHiden}) no-repeat center`
// };

// const view = {
//     background: `url(${btnView}) no-repeat center`
// };

const errorInput = {
    backgroundColor: '#fff6f6',
    borderColor: '#e0b4b4',
    color: '#9f3a38',
    boxShadow: 'none'
};
class ContentModalUser extends React.Component<ContentModalUsersProps, ContentModalUsersState> {
    constructor(props: ContentModalUsersProps) {
        super(props);
        this.state = {
            id: this.props.userId,
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            hidden: true,
            email: '',
            authenticationType: '',
            enabled: null,
            roles: [],
            rolesAll: [],
            permissions: [],
            permissionsAll: [],
            error: null,
            checkAllPermissions: false
        };
        this.permissionsAllData();
        this.rolesAllData();
        this.handlerInputUser = this.handlerInputUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        // this.seePasword = this.seePasword.bind(this);
    }
    public componentDidMount() {
        this.props.receiveAction(this.saveUser);
        if (this.state.id !== null) {
            this.props.getRecordById(this.props.userId).then((data: any) => {
                if (data) {
                    this.setState({
                        id: data.id,
                        username: data.username,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        hidden: true,
                        email: data.email,
                        authenticationType: data.authTypeEnum,
                        enabled: data.status,
                        roles: data.roles.map((itemRol: any) => itemRol.id),
                        permissions: data.permissions.map((itemPerm: any) => itemPerm),
                        checkAllPermissions: (data.permissions.length ===
                            this.state.permissionsAll.length ? true : false)
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

    public render() {
        console.log('READ ONLY', this.state.id);
        return (
            <div >
                <Form>
                    <Grid verticalAlign="middle" columns="equal">
                        <Grid.Row >
                            <Grid.Column width={8}>
                                <Form.Field required>
                                    <label>User Name </label>
                                    <input
                                        data-style={!this.state.username ? errorInput : null}
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        placeholder="User Name"
                                        onChange={this.handlerInputUser}  
                                        disabled={this.state.id !== null && this.props.readOnly === false ? 
                                        true : this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={8} className="athenticationUser">
                                <Form.Field required>
                                    <label>Authentication type </label>
                                    <Dropdown
                                        name="authentication"
                                        className="selectState"
                                        placeholder="Select authentication type:"
                                        fluid
                                        selection
                                        options={authenticationTypes.map((auth: any) => {
                                            return {
                                                key: auth.key,
                                                text: auth.text,
                                                value: auth.value
                                            };
                                        })}
                                        value={this.state.authenticationType}
                                        onChange={this.handlerDropdownAuthType}  
                                        disabled={this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={8} className="nameUser">
                                    <Form.Field required>
                                        <label>First Name </label>
                                        <input
                                            data-style={!this.state.firstname ? errorInput : null}
                                            type="text"
                                            name="firstname"
                                            value={this.state.firstname}
                                            placeholder="First Name"
                                            onChange={this.handlerInputUser}  
                                            disabled={this.props.readOnly}/>
                                    </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={8} className="nameUser">
                                <Form.Field required>
                                    <label>Last Name </label>
                                    <input
                                        data-style={!this.state.lastname ? errorInput : null}
                                        type="text"
                                        name="lastname"
                                        value={this.state.lastname}
                                        placeholder="Last Name"
                                        onChange={this.handlerInputUser}  
                                        disabled={this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={8} className="emailUser">
                                    <Form.Field required>
                                        <label>Email </label>
                                        <input
                                            data-style={!this.state.email ? errorInput : null}
                                            type="text"
                                            name="email"
                                            value={this.state.email}
                                            placeholder="Email"
                                            onChange={this.handlerInputUser} 
                                            disabled={this.props.readOnly} />
                                    </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={8} className="rolesUser">
                                <Form.Field>
                                    <label>Roles </label>
                                    <Dropdown
                                        name="roles"
                                        className="selectState"
                                        placeholder="Select roles"
                                        fluid
                                        multiple
                                        selection
                                        options={this.state.rolesAll.map((role: any) => {
                                            return {
                                                key: role.id,
                                                text: role.name,
                                                value: role.id
                                            };
                                        })}
                                        value={this.state.roles}
                                        onChange={this.handlerDropdownRoles}  
                                        disabled={this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                            {/* <Grid.Column width={7} className="passwordUser">
                                <Form.Field required>
                                    <label>Password </label>
                                    <input
                                    data-style={!this.state.password ? errorInput : null}
                                    type={this.state.hidden ? 'password' : 'text'}
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handlerInputUser} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <button
                                    className="btnPassword"
                                    style={this.state.hidden ? hiden : view}
                                    onClick={this.seePasword}>
                                </button>
                            </Grid.Column> */}
                        </Grid.Row>
                        <Grid.Row verticalAlign="top">
                            <Grid.Column width={12}>
                                <Form.Field>
                                    <label>+ Permissions </label>
                                    <Dropdown
                                        name="permissions"
                                        className="selectState"
                                        placeholder="Select permissions"
                                        fluid
                                        multiple
                                        selection
                                        options={this.state.permissionsAll.map((permission: any) => {
                                            return {
                                                key: permission,
                                                text: permission,
                                                value: permission
                                            };
                                        })}
                                        value={this.state.permissions}
                                        onChange={this.handlerDropdownPermissions}  
                                        disabled={this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Checkbox className="chkPermissionAll" label="Select All"
                                    onChange={this.handleAllPermissions}
                                    checked={this.state.checkAllPermissions}   
                                    disabled={this.props.readOnly}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                {this.state.error ?
                    <Message
                        negative
                        onDismiss={this.closeMsg}>
                        <Message.Header>Ups error! {this.state.error}</Message.Header>
                    </Message> : null}
            </div >
        );
    }

    private handlerInputUser(e: any) {
        this.props.disableBtn(false);
        switch (e.currentTarget.name) {
            case 'username':
                this.setState({ username: e.currentTarget.value });
                break;
            case 'firstname':
                this.setState({ firstname: e.currentTarget.value });
                break;
            case 'lastname':
                this.setState({ lastname: e.currentTarget.value });
                break;
            case 'email':
                this.setState({ email: e.currentTarget.value });
                break;
            case 'password':
                this.setState({ password: e.currentTarget.value });
                break;
            default:
                console.log(e.currentTarget.value);
                break;
        }
    }

    private handlerDropdownRoles?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            this.setState({ roles: data.value as string[]});
        }

    private handlerDropdownPermissions?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            const dataPerm = data.value as string[];
            this.setState({ permissions: dataPerm });
            this.setState({checkAllPermissions : (dataPerm.length ===
                this.state.permissionsAll.length ? true : false)});
        }

    private handlerDropdownAuthType?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            this.setState({ authenticationType: data.value as string });
        }

    // Método que ejecuta el alta y la edición de Users
    private saveUser(): Promise<void> | void {

        // if (this.state.username === '') {
        //     this.setState({ error: 'Incomplete or erroneous fields' });
        // } else {

        if (this.state.id === null) {
            const datos = {
                username: this.state.username,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                password: '12345678',
                email: this.state.email,
                authTypeEnum: this.state.authenticationType,
                roles: this.state.roles,
                permissions: this.state.permissions
            };
            return this.props.postUsers(datos);
        } else {
            const datos = {
                username: this.state.username,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                password: '12345678',
                email: this.state.email,
                authTypeEnum: this.state.authenticationType,
                roles: this.state.roles,
                permissions: this.state.permissions,
                status: this.state.enabled
            };
            console.log('Los datos son: ', JSON.stringify(datos));
            return this.props.putUsers(this.state.id, datos);
        }
        // }

    }

    // private seePasword = () => {
    //     this.setState({ hidden: !this.state.hidden });
    // }

    private handleAllPermissions = () => {
        if (this.state.checkAllPermissions === false) {
            this.setState({ permissions: this.state.permissionsAll });
        } else {
            this.setState({ permissions: [] });
        }
        this.setState({ checkAllPermissions: !this.state.checkAllPermissions });
    }

    private closeMsg = () => {
        this.setState({ error: null });
        this.props.disableBtn(false);
    }

    private permissionsAllData = () => {
        this.props.getAllPermissions()
            .then((permissions) => {
                const permissionOption: string[] = [];
                permissions.map((permission: any) => {
                    permissionOption.push(permission);
                });
                this.setState({ permissionsAll: permissionOption });
            });
    }

    private rolesAllData = () => {
        this.props.getAllRoles()
            .then((roles) => {
                const rolesOption: Array<{}> = [];
                roles.map((role: any) => {
                    rolesOption.push(role);
                });
                this.setState({ rolesAll: rolesOption });
            });
    }

}

export default ContentModalUser;