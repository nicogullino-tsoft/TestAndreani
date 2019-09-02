import { connect } from 'react-redux';
import * as React from 'react';
import { dispatchGetUsers } from '../../actions/users';
import { dispatchGetUserById } from '../../actions/users';
import { dispatchGetPermissions } from '../../actions/permissions';
import { dispatchGetRoles } from '../../actions/roles';
import { dispatchPostUser } from '../../actions/users';
import { dispatchPutUser } from '../../actions/users';
import { dispatchPutUserStatus } from '../../actions/users';
import { dispatchGetCountUsers } from '../../actions/users';
import ContentModalUser from './contentModalUsers';
import AbmView from '../../components/abm/abmView';
import UsersViewProps from './UsersViewProps';
import UsersViewState from './UsersViewState';
// import axios from '../../api';
import ModelDefinition from '../../components/abm/ModelDefinition';
// import { dispatchGetCredential } from '../../actions/credentials';
// import { dispatchGetProvider } from '../../actions/providers';

class UsersView extends React.Component<UsersViewProps, UsersViewState> {

    constructor(props: UsersViewProps) {
        super(props);
        this.state = {
            saveUserModel: null,
            userId: null,
            page: 0,
            size: 2,
            user: this.props.user,
            countPage: undefined,
            disableBtn: true,
            view: undefined
        };

        this.receiveAction = this.receiveAction.bind(this);

    }

    public getModelDefinition = () => {

        const arrayColumns: Array<{
            label: string,
            property: string,
            visible: boolean,
            type: string
        }> = [
                {
                    label: 'Id',
                    property: 'id',
                    visible: false,
                    type: 'field'
                },
                {
                    label: 'User Name',
                    property: 'username',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'First Name',
                    property: 'firstname',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'Last Name',
                    property: 'lastname',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'Role',
                    property: 'roles',
                    visible: true,
                    type: 'fieldArray'
                },
                {
                    label: 'State',
                    property: 'status',
                    visible: true,
                    type: 'control'
                },
                {
                    label: 'Reset',
                    property: 'id',
                    visible: true,
                    type: 'control'
                },
                {
                    label: 'Edit',
                    property: 'id',
                    visible: true,
                    type: 'control'
                }
            ];

        const objectModalContent: {
            title: string,
            abm: any
        } = {
            title: 'User',
            abm: <ContentModalUser
            receiveAction={this.receiveAction}
            getRecordById={this.props.getUsersById}
            userId={this.state.userId}
            postUsers={this.props.postUsers}
            putUsers={this.props.putUsers}
            getAllPermissions={this.props.getAllPermissions}
            getAllRoles={this.props.getAllRoles}
            disableBtn={(disableBtn: boolean) => this.setState({ disableBtn })} 
            readOnly={this.state.view === 'View' ? true : false}/>
        };

        const miModel: ModelDefinition = new ModelDefinition(
            arrayColumns,
            objectModalContent,
            'id',
            true,
            true,
            true,
            true,
            true,
            '/users/'
        );
        return miModel;
    }

    public render() {
        return (
            <div className="users">
                <AbmView
                    modelDefinition={this.getModelDefinition()}
                    data={undefined}
                    dataPagination={this.props.getUsers}
                    actionSave={this.saveUser}
                    actionEdit={(id: number, view: string | undefined) => this.setState({ userId: id, view })}
                    putStatus={this.props.putUsersStatus}
                    allElements={this.props.getCountUsers}
                    size={this.state.size}
                    disableBtn={this.state.disableBtn}
                />
            </div>
        );
    }

    private saveUser = () => this.state.saveUserModel();

    private receiveAction = (saveUserChild: any) => {

        if (this.state.userId === null) { this.setState({ view: undefined }); }
        this.setState({ saveUserModel: saveUserChild, userId: null, disableBtn: true });

    }
}

const mapStateToProps = (state: { user: any; }, props: any) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch: any) => {

    return {
        getUsers: (page: number, size: number) => (dispatch(dispatchGetUsers(page, size))),
        getUsersById: (id: number | null) => (dispatch(dispatchGetUserById(id))),
        postUsers: (data: object) => (dispatch(dispatchPostUser(data))),
        putUsers: (id: number, data: object) => (dispatch(dispatchPutUser(id, data))),
        putUsersStatus: (data: object) => (dispatch(dispatchPutUserStatus(data))),
        getAllRoles: () => (dispatch(dispatchGetRoles())),
        getAllPermissions: () => (dispatch(dispatchGetPermissions())),
        getCountUsers: () => (dispatch(dispatchGetCountUsers()))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(UsersView);
