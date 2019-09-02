import { connect } from 'react-redux';
import * as React from 'react';
import { dispatchGetRoles } from '../../actions/roles';
import { dispatchGetRoleById } from '../../actions/roles';
import { dispatchPostRole } from '../../actions/roles';
import { dispatchGetPermissions } from '../../actions/permissions';
import { dispatchPutRole } from '../../actions/roles';
import { dispatchPutRoleStatus } from '../../actions/roles';
import ContentModalRole from './contentModalRoles';
import AbmView from '../../components/abm/abmView';
import RolesViewProps from './RolesViewProps';
import RolesViewState from './RolesViewState';
import ModelDefinition from '../../components/abm/ModelDefinition';

class RolesView extends React.Component<RolesViewProps, RolesViewState> {

    constructor(props: RolesViewProps) {
        super(props);
        this.state = {
            saveRoleModel: null,
            roleId: null,
            page: 0,
            size: 4,
            role: this.props.role,
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
                    label: 'Name',
                    property: 'name',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'Permissions',
                    property: 'permissions',
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
            title: 'Role',
            abm: <ContentModalRole
            receiveAction={this.receiveAction}
            getRecordById={this.props.getRolesById}
            roleId={this.state.roleId}
            postRoles={this.props.postRoles}
            putRoles={this.props.putRoles}
            getAllPermissions={this.props.getAllPermissions}
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
            '/roles/'
        );
        return miModel;
    }

    public render() {
        return (
            <div className="roles">
                <AbmView
                    modelDefinition={this.getModelDefinition()}
                    data={this.props.getRoles}
                    dataPagination={undefined}
                    actionSave={this.saveRole}
                    actionEdit={(id: number, view: string | undefined) => this.setState({ roleId: id, view })}
                    putStatus={this.props.putRolesStatus}
                    pagination={undefined}
                    totalPages={undefined}
                    allElements={undefined}
                    size={undefined}
                    disableBtn={this.state.disableBtn}
                />
            </div>
        );
    }

    private saveRole = () => this.state.saveRoleModel();

    private receiveAction = (saveRoleChild: any) => {

        this.setState({ saveRoleModel: saveRoleChild, roleId: null, disableBtn: true });

    }

    // private pagination = (e: any) => {
    //     if (this.state.countPage !== undefined) {
    //         let num: number;
    //         if (!Number.isInteger(this.state.countPage / this.state.size)) {
    //             num = this.state.countPage / this.state.size;
    //         } else {
    //             num = 0;
    //         }
    //         const num1: number = num;
    //         if (parseInt(e.target.attributes.value.value, 10) >= 1
    //             && parseInt(e.target.attributes.value.value, 10) <= num1
    //             ? Math.round(this.state.countPage / this.state.size) + 1
    //             : this.state.countPage / this.state.size) {
    //             const page = parseInt(e.target.attributes.value.value, 10) - 1;
    //             this.axiosPaginable(page);
    //         }
    //     }
    // }

    // private axiosPaginable = (page: number) => {
    //     axios.get('/projects?page=' + page + '&size=' + this.state.size).then((r) => {
    //         this.setState({ project: r.data, page });
    //     });
    // }

    // private axiosCountPaginable = () => {
    //     axios.get('/projects/count').then((r) => {
    //         this.setState({ countPage: r.data.count });
    //         this.axiosPaginable(0);
    //     });
    // }
}

const mapStateToProps = (state: { role: { role: any; }; }, props: any) => {
    return {
        role: state.role.role
    };
};

const mapDispatchToProps = (dispatch: any) => {

    return {
        getRoles: () => (dispatch(dispatchGetRoles())),
        getRolesById: (id: number | null) => (dispatch(dispatchGetRoleById(id))),
        postRoles: (data: object) => (dispatch(dispatchPostRole(data))),
        putRoles: (id: number, data: object) => (dispatch(dispatchPutRole(id, data))),
        putRolesStatus: (data: object) => (dispatch(dispatchPutRoleStatus(data))),
        getAllPermissions: () => (dispatch(dispatchGetPermissions()))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(RolesView);
