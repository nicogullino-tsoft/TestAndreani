import * as React from 'react';
import { Dropdown, Form, Grid, Message, DropdownProps, Checkbox } from 'semantic-ui-react';
import ContentModalRolesState from './ContentModalRolesState';
import ContentModalRolesProps from './ContentModalRolesProps';

const errorInput = {
    backgroundColor: '#fff6f6',
    borderColor: '#e0b4b4',
    color: '#9f3a38',
    boxShadow: 'none'
};
class ContentModalRole extends React.Component<ContentModalRolesProps, ContentModalRolesState> {
    constructor(props: ContentModalRolesProps) {
        super(props);
        this.state = {
            id: this.props.roleId,
            description: '',
            permissions: [],
            permissionsAll: [],
            enabled: true,
            error: null,
            positive: false,
            urlError: false,
            checkAllPermissions: false
        };

        this.handlerInputRole = this.handlerInputRole.bind(this);
        this.saveRole = this.saveRole.bind(this);
        this.permissionsAllData();
    }
    public componentDidMount() {
        this.props.receiveAction(this.saveRole);
        if (this.state.id !== null) {
            this.props.getRecordById(this.props.roleId).then((data: any) => {
                if (data) {
                    this.setState({
                        id: data.id,
                        description: data.name,
                        enabled: data.status,
                        permissions: data.permissions.map((item: any) => item),
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
        return (
            <div >
                <Form>
                    <Grid verticalAlign="middle" columns="equal">
                        <Grid.Row >
                            <Grid.Column width={10}>
                                <Form.Field required>
                                    <label >Role Name </label>
                                    <input
                                        data-style={!this.state.description ? errorInput : null}
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        placeholder="Role Name"
                                        onChange={this.handlerInputRole}  
                                        disabled={this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={12} className="permissionsRole">
                                <Form.Field>
                                    <label>Permissions </label>
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
                                        onChange={this.handlerDropdown} 
                                        disabled={this.props.readOnly} />
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

    private handlerInputRole(e: any) {
        this.props.disableBtn(false);
        switch (e.currentTarget.name) {
            case 'description':
                this.setState({ description: e.currentTarget.value });
                break;
            default:
                console.log(e.currentTarget.value);
                break;
        }

    }

    private handlerDropdown?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            const dataPerm = data.value as string[];
            this.setState({ permissions: dataPerm });
            this.setState({checkAllPermissions : (dataPerm.length ===
                this.state.permissionsAll.length ? true : false)});
        }

    // Método que ejecuta el alta y la edición de Roles
    private saveRole(): Promise<void> | void {
        
        // if (this.state.description === '') {
        //     this.setState({ error: 'Incomplete or erroneous fields' });
        // } else {
            if (this.state.id === null) {
                const datos = {
                    name: this.state.description,
                    permissions: this.state.permissions
                };
                return this.props.postRoles(datos);
            } else {
                const datos = {
                    name: this.state.description,
                    permissions: this.state.permissions,
                    status: this.state.enabled
                };
                return this.props.putRoles(this.state.id, datos);
            }
        // }

    }

    private closeMsg = () => {
        this.setState({ positive: null, error: null });
        this.props.disableBtn(false);
    }

    private handleAllPermissions = () => {
        if (this.state.checkAllPermissions === false) {
            this.setState({ permissions: this.state.permissionsAll });
        } else {
            this.setState({ permissions: [] });
        }
        this.setState({ checkAllPermissions: !this.state.checkAllPermissions });
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

}

export default ContentModalRole;