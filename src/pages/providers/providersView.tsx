import { connect } from 'react-redux';
import * as React from 'react';
import { dispatchGetProvider } from '../../actions/providers';
import { dispatchGetProviderById } from '../../actions/providers';
import { dispatchPostTest } from '../../actions/providers';
import { dispatchPostProvider } from '../../actions/providers';
import { dispatchPutProvider } from '../../actions/providers';
import { dispatchPutProviderStatus } from '../../actions/providers';
import ProvidersViewProps from './ProvidersViewProps';
import ProvidersViewState from './ProvidersViewState';
import ContentModalProvider from './contentModalProviders';
import AbmView from '../../components/abm/abmView';
import ModelDefinition from '../../components/abm/ModelDefinition';

class ProvidersView extends React.Component<ProvidersViewProps, ProvidersViewState> {
    constructor(props: ProvidersViewProps) {
        super(props);
        this.state = {
            saveProviderModel: null,
            providerId: null,
            disableBtn: true,
            view: undefined
        };

        this.receiveAction = this.receiveAction.bind(this);

    }
    // public componentDidMount() {
    //     this.props.getProviders();
    // }
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
                    property: 'description',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'Base Url',
                    property: 'url_base',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'Type',
                    property: 'protocols',
                    visible: true,
                    type: 'fieldArray'
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
            title: 'Provider',
            abm: <ContentModalProvider
                receiveAction={this.receiveAction}
                getRecordById={this.props.getProviderById}
                providerId={this.state.providerId}
                postTest={this.props.postTest}
                postProviders={this.props.postProviders}
                putProviders={this.props.putProviders}
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
            '/providers/'
        );
        return miModel;
    }

    public render() {
        return (
            <div className="providers">
                <AbmView
                    modelDefinition={this.getModelDefinition()}
                    data={this.props.getProviders}
                    actionSave={this.saveProvider}
                    actionEdit={(id: number, view: string | undefined) => this.setState({ providerId: id, view })}
                    putStatus={this.props.putProviderStatus}
                    disableBtn={this.state.disableBtn}
                />
            </div>
        );
    }

    private saveProvider = () => this.state.saveProviderModel();

    private receiveAction = (saveProviderChild: any) => {

        this.setState({ saveProviderModel: saveProviderChild, providerId: null, disableBtn: true });

    }
}

const mapStateToProps = (state: { provider: { provider: any; }; }, props: any) => {
    return {
        provider: state.provider.provider
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getProviders: () => (dispatch(dispatchGetProvider())),
        getProviderById: (id: number | null) => (dispatch(dispatchGetProviderById(id))),
        postProviders: (datos: object) => (dispatch(dispatchPostProvider(datos))),
        postTest: (datos: object) => (dispatch(dispatchPostTest(datos))),
        putProviders: (id: number, datos: object) => (dispatch(dispatchPutProvider(id, datos))),
        putProviderStatus: (status: object) => (dispatch(dispatchPutProviderStatus(status)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersView);
