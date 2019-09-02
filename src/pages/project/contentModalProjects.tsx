import * as React from 'react';
import { Tab, Form, Grid, Dropdown, DropdownProps, Message } from 'semantic-ui-react';
// import Btn from '../../components/buttons/btn';
import ContentModalProjectsState from './ContentModalProjectsState';
import ContentModalProjectsProps from './ContentModalProjectsProps';
const Cron = require('react-cron-generator/dist').default;
import 'react-cron-generator/dist/cron-builder.css';

class ContentModalProject extends React.Component<ContentModalProjectsProps, ContentModalProjectsState> {
    constructor(props: ContentModalProjectsProps) {
        super(props);
        this.state = {
            id: this.props.projectId,
            name: '',
            description: '',
            credentialId: 0,
            protocolId: 0,
            providerId: 0,
            error: undefined,
            positive: false,
            enabled: false,
            credentialIdMap: new Map(),
            providerIdMap: new Map(),
            protocolIdMap: new Map(),
            repositoryData: new Map(),
            repositoryIds: [],
            repositoryDataList: [],
            repositoriesValues: [],
            credentials: [],
            providers: [],
            protocolIds: [],
            valueCron: '* * * * * * *'
        };

        this.handlerInputProject = this.handlerInputProject.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }

    public componentDidMount() {
        this.props.receiveAction(this.saveProject);
        if (this.state.id !== null) {
            this.props.getRecordById(this.props.projectId).then((data: any) => {
                if (data) {
                    let protocolName;
                    for (let i = 0; data.providerData.protocols.length > i; i++) {
                        if (data.providerData.protocols[i].id === data.protocolId) {
                            protocolName = data.providerData.protocols[i].protocol;
                        }
                    }
                    const repositoriesValues: string[] = [];
                    const repositoryIds: number[] = [];
                    for (let i = 0; data.repositoryData.length > i; i++) {
                        this.state.repositoryData.set(
                            data.repositoryData[i].id,
                            data.repositoryData[i].name);
                        repositoriesValues.push(data.repositoryData[i].name);
                        repositoryIds.push(data.repositoryData[i].id);
                    }

                    this.setState({
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        repositoryData: data.repositoryData,
                        credentialIdMap: this.state.credentialIdMap.set(
                            data.credentialData.id,
                            data.credentialData.name),
                        credentialId: data.credentialData.id,
                        providerId: data.providerData.id,
                        providerIdMap: this.state.providerIdMap.set(
                            data.providerData.id,
                            data.providerData.description),
                        protocolIds: data.providerData.protocols,
                        protocolId: data.protocolId,
                        protocolIdMap: this.state.protocolIdMap.set(
                            data.protocolId,
                            protocolName),
                        repositoriesValues,
                        valueCron: data.cronExpression,
                        repositoryIds,
                        enabled: data.status
                    });
                }
            });
        }
        this.repositoriesData();
        this.credentialsData();
        this.providersData();
    }

    public render() {
        return (
            <div >
                {/* panes={panes} */}
                <Tab menu={{ secondary: true, pointing: true }} panes={
                    [
                        {
                            menuItem: 'Project',
                            render: () => {
                                return (
                                    <Tab.Pane attached={false}>
                                        <Form>
                                            <Grid verticalAlign="middle" columns="equal">
                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Project Name</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={11}>
                                                        <input
                                                            required={!this.state.name ? true : false}
                                                            type="text" name="name"
                                                            value={this.state.name}
                                                            placeholder="Name"
                                                            onChange={this.handlerInputProject}
                                                            disabled={this.props.readOnly} />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Description</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={11}>
                                                        <input
                                                            required={!this.state.description ? true : false}
                                                            type="text" name="description"
                                                            value={this.state.description}
                                                            placeholder="Description"
                                                            onChange={this.handlerInputProject}
                                                            disabled={this.props.readOnly} />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field>
                                                            <label>Credentials</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={11}>
                                                        <Dropdown
                                                            placeholder="Select the credential"
                                                            fluid

                                                            selection
                                                            value={
                                                                this.state.credentialIdMap.get(this.state.credentialId)
                                                            }
                                                            options={this.state.credentials.map((credential: any) => {
                                                                return {
                                                                    key: credential.id,
                                                                    text: credential.name,
                                                                    value: credential.name
                                                                };
                                                            })}
                                                            onChange={this.handlerDropdownCredential}
                                                            disabled={this.props.readOnly}
                                                        />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Providers</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={7}>
                                                        <Dropdown
                                                            placeholder="Select the provider"
                                                            fluid
                                                            selection
                                                            value={
                                                                this.state.providerIdMap.get(this.state.providerId)
                                                            }
                                                            options={this.state.providers.map((provider: any) => {
                                                                return {
                                                                    key: provider.id,
                                                                    text: provider.description,
                                                                    value: provider.description
                                                                };
                                                            })}
                                                            onChange={this.handlerDropdownProvider}
                                                            disabled={this.props.readOnly}
                                                        />
                                                    </Grid.Column>
                                                    <Grid.Column width={4}>
                                                        <Dropdown
                                                            placeholder="Protocol"
                                                            fluid
                                                            selection
                                                            value={
                                                                this.state.protocolIdMap.get(this.state.protocolId)
                                                            }
                                                            options={this.state.protocolIds.map((protocol: any) => {
                                                                return {
                                                                    key: protocol.id,
                                                                    text: protocol.protocol,
                                                                    value: protocol.protocol
                                                                };
                                                            })}
                                                            onChange={this.handlerDropdownProtocol}
                                                            disabled={this.props.readOnly}
                                                        />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Form>
                                        {this.state.error ?
                                            <Message negative onDismiss={this.closeMsg}>
                                                <Message.Header>Ups error! {this.state.error}</Message.Header>
                                            </Message> : null}
                                    </Tab.Pane>
                                );
                            }
                        },
                        {
                            menuItem: 'Repositories',
                            render: () => {
                                return (
                                    <Tab.Pane attached={false}>
                                        <Dropdown
                                            placeholder="Repositories"
                                            fluid
                                            multiple
                                            search
                                            selection
                                            value={this.state.repositoriesValues}
                                            options={this.state.repositoryDataList.map((repository: any) => {
                                                return {
                                                    key: repository.id,
                                                    text: repository.name,
                                                    value: repository.name
                                                };
                                            })}
                                            onChange={this.handlerDropdownRepository}
                                            disabled={this.props.readOnly}
                                        />
                                    </Tab.Pane>
                                );
                            }
                        },
                        {
                            menuItem: 'Cron Expression',
                            render: () => {
                                return (
                                    <Tab.Pane attached={false}>
                                        <Grid.Column>
                                            <div>
                                                <Cron
                                                    onChange={(e: any) => this.setState({ valueCron: e })}
                                                    value={this.state.valueCron}
                                                    showResultText={true}
                                                    showResultCron={true}
                                                    disabled={this.props.readOnly}
                                                />
                                            </div>
                                        </Grid.Column>
                                    </Tab.Pane>
                                );
                            }
                        }
                    ]
                } />
            </div >
        );
    }

    private repositoriesData = () => {
        this.props.getAllRepositories()
            .then((repositories) => {
                const repositoryOption: Array<{}> = [];
                const aRepository: number[] = [];
                for (const index in this.state.repositoryData) {
                    if (this.state.repositoryData.hasOwnProperty(index)) {
                        aRepository.push(this.state.repositoryData[index].id);
                    }
                }
                repositories.map((repository: any, index: number) => {
                    if (repository.status || aRepository.indexOf(repository.id) !== -1) {
                        repositoryOption.push(repository);
                    }
                });
                this.setState({ repositoryDataList: repositoryOption });
                // this.setState({ repositoryDataList: repositories });
            });
    }

    private handlerDropdownRepository?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            let repositoriesValues = data.value as string[];
            let repositoryIds: number[] = [];
            const name = 'name';
            const id = 'id';

            for (let i = 0; this.state.repositoryDataList.length > i; i++) {
                for (let j = 0; repositoriesValues.length > j; j++) {
                    if (this.state.repositoryDataList[i][name] === repositoriesValues[j]) {
                        repositoryIds.push(this.state.repositoryDataList[i][id]);
                    }
                }
            }

            this.setState({ repositoriesValues, repositoryIds });
            repositoriesValues = [];
            repositoryIds = [];

        }

    private credentialsData = () => {
        this.props.getAllCredentials()
            .then((credentials) => {
                const credentialOption: Array<{}> = [];
                credentials.map((credential: any) => {
                    if (credential.enabled || credential.id === this.state.credentialId) {
                        credentialOption.push(credential);
                    }
                });
                this.setState({ credentials: credentialOption });
            });
    }

    private handlerDropdownCredential?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            this.state.credentialIdMap.clear();
            this.props.disableBtn(false);
            const credentials = data.options;
            const id = 'id';
            const name = 'name';
            for (let i = 0; this.state.credentials.length > i; i++) {
                if (credentials !== undefined && credentials[i].value === data.value) {
                    if (this.state.credentials[i][id] === credentials[i].key) {
                        this.setState({
                            credentialIdMap:
                                this.state.credentialIdMap.set(
                                    this.state.credentials[i][id],
                                    this.state.credentials[i][name]),
                            credentialId: this.state.credentials[i][id]
                        });
                    }
                }
            }
        }

    private providersData = () => {
        this.props.getAllProviders()
            .then((providers) => {
                const providerOption: Array<{}> = [];
                providers.map((provider: any) => {
                    if (provider.enabled || provider.id === this.state.providerId) {
                        providerOption.push(provider);
                    }
                });
                this.setState({ providers: providerOption });
            });
    }

    private handlerDropdownProvider?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            this.state.providerIdMap.clear();
            this.props.disableBtn(false);
            const providers = data.options;
            const id = 'id';
            const description = 'description';
            const protocols = 'protocols';
            for (let i = 0; this.state.providers.length > i; i++) {
                if (providers !== undefined && providers[i].value === data.value) {
                    if (this.state.providers[i][id] === providers[i].key) {
                        this.setState({
                            providerIdMap:
                                this.state.providerIdMap.set(
                                    this.state.providers[i][id],
                                    this.state.providers[i][description]),
                            providerId: this.state.providers[i][id],
                            protocolIds: this.state.providers[i][protocols]
                        });
                    }
                }
            }
        }

    private handlerDropdownProtocol?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            this.props.disableBtn(false);
            this.state.protocolIdMap.clear();
            const protocols = data.options;
            const id = 'id';
            const protocol = 'protocol';
            for (let i = 0; this.state.protocolIds.length > i; i++) {
                if (protocols !== undefined && protocols[i].value === data.value) {
                    if (this.state.protocolIds[i][id] === protocols[i].key) {
                        this.setState({
                            protocolIdMap:
                                this.state.protocolIdMap.set(
                                    this.state.protocolIds[i][id],
                                    this.state.protocolIds[i][protocol]),
                            protocolId: this.state.protocolIds[i][id]
                        });
                    }
                }
            }
        }

    private handlerInputProject(e: any) {
        // this.setState({ [e.target.name]: e.target.value });
        this.props.disableBtn(false);
        switch (e.currentTarget.name) {
            case 'name':
                this.setState({ name: e.currentTarget.value });
                break;
            case 'description':
                this.setState({ description: e.currentTarget.value });
                break;
            default:
                console.log(e.currentTarget.value);
                break;
        }
    }

    // Método que ejecuta el alta y la edición de Proveedores
    //  || this.state.protocols.length === 0
    private saveProject(): Promise<void> | void {
        // if (!(this.state.name && this.state.description)) {
        //     this.setState({ error: 'Incomplete or erroneous fields' });
        // } else {
        if (this.state.id === null) {
            const datos = {
                credentialId: this.state.credentialId,
                description: this.state.description,
                name: this.state.name,
                protocolId: this.state.protocolId,
                repositoryIds: this.state.repositoryIds
            };
            return this.props.postProjects(datos);
        } else {
            const datos = {
                credentialId: this.state.credentialId,
                description: this.state.description,
                status: this.state.enabled,
                name: this.state.name,
                protocolId: this.state.protocolId,
                repositoryIds: this.state.repositoryIds,
                cronExpression: this.state.valueCron
            };
            console.log('LO QUE VA GUARDAR', JSON.stringify(datos));
            return this.props.putProjects(this.state.id, datos);
        }
    }

    private closeMsg = () => {
        this.setState({ positive: null, error: undefined });
        this.props.disableBtn(false);
    }
}

export default ContentModalProject;