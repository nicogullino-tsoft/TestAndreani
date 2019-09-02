import { connect } from 'react-redux';
import * as React from 'react';
import { dispatchGetCredential } from '../../actions/credentials';
import { dispatchGetCredentialById } from '../../actions/credentials';
import { dispatchPostCredential } from '../../actions/credentials';
import { dispatchPutCredential } from '../../actions/credentials';
import { dispatchPutCredentialStatus } from '../../actions/credentials';
import ContentModalCredential from './contentModalCredential';
import AbmView from '../../components/abm/abmView';
import CredentialViewState from './CredentialViewState';
import CredentialViewProps from './CredentialViewProps';
import ModelDefinition from '.././../components/abm/ModelDefinition';

class CredentialsView extends React.Component<CredentialViewProps, CredentialViewState> {

    constructor(props: CredentialViewProps) {
        super(props);
        this.state = {
            saveRecordModel: null,
            credentialId: null,
            disableBtn: true,
            view: undefined
        };

        this.receiveAction = this.receiveAction.bind(this);
    }

    // public componentDidMount() {
    //     this.props.getCredentials();
    // }

    public saveRecord = () => this.state.saveRecordModel();

    public receiveAction = (saveRecordChild: any) => {

        this.setState({ saveRecordModel: saveRecordChild, credentialId: null, disableBtn: true });
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
                    label: 'User name',
                    property: 'username',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'State',
                    property: 'enabled',
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
            title: 'Credential',
            abm: <ContentModalCredential
                receiveAction={this.receiveAction}
                getRecordById={this.props.getCredentialById}
                credentialId={this.state.credentialId}
                postCredentials={this.props.postCredentials}
                putCredentials={this.props.putCredentials}
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
            false,
            '/credentials/'
        );
        return miModel;
    }

    public render() {
        return (
            <div className="credentials">
                <AbmView
                    modelDefinition={this.getModelDefinition()}
                    data={this.props.getCredentials}
                    actionSave={this.saveRecord}
                    actionEdit={(id: number, view: string | undefined) => this.setState({ credentialId: id, view })}
                    putStatus={this.props.putCredentialStatus}
                    disableBtn={this.state.disableBtn} />

            </div>
        );
    }
}

const mapStateToProps = (state: { credential: { credential: any; }; }, props: any) => {
    return {
        credential: state.credential.credential,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getCredentials: () => (dispatch(dispatchGetCredential())),
        getCredentialById: (id: number) => (dispatch(dispatchGetCredentialById(id))),
        postCredentials: (datos: object) => (dispatch(dispatchPostCredential(datos))),
        putCredentials: (id: number, datos: any) => (dispatch(dispatchPutCredential(id, datos))),
        putCredentialStatus: (body: object) => (dispatch(dispatchPutCredentialStatus(body)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CredentialsView);
