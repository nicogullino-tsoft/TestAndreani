import * as React from 'react';
import { Dropdown, Form, Grid, Tab, DropdownProps, Message } from 'semantic-ui-react';
import ContentModalRepositoriesProps from './ContentModalRepositoriesProps';
import ContentModalRepositoriesState from './ContentModalRepositoriesState';
const Cron = require('react-cron-generator/dist').default;
import 'react-cron-generator/dist/cron-builder.css';

class ContentModalRepositories extends React.Component<ContentModalRepositoriesProps, ContentModalRepositoriesState> {
    constructor(props: ContentModalRepositoriesProps) {
        super(props);
        this.state = {
            description: '',
            endpoint: '',
            name: '',
            credentialId: 0,
            projectId: 0,
            protocolId: 0,
            repositoryId: 0,
            providerId: 0,
            status: true,
            error: '',
            positive: false,
            credentials: [],
            projects: [],
            providers: [],
            projectsDataList: [],
            protocolIds: [],
            credentialIdMap: new Map(),
            providerIdMap: new Map(),
            projectIdMap: new Map(),
            protocolIdMap: new Map(),
            enabled: false,
            id: this.props.repositoryId,
            protocols: undefined,
            valueCron: '* * * * * * *'
        };
        this.handlerInputRepository = this.handlerInputRepository.bind(this);
        this.saveRepository = this.saveRepository.bind(this);
    }

    public componentDidMount() {
        this.props.receiveAction(this.saveRepository);

        if (this.state.repositoryId !== null) {
            this.props.getRecordById(this.props.repositoryId)
                .then((data: any) => {
                    if (data) {
                        this.setState({
                            id: data.id,
                            name: data.name,
                            description: data.description,
                            credentialId: data.credential.id,
                            endpoint: data.url,
                            projectId: data.project !== null
                                ? data.project.id
                                : null,
                            providerId: data.provider.id,
                            credentialIdMap: this.state.credentialIdMap.set(
                                data.credential.id,
                                data.credential.name),
                            providerIdMap: this.state.providerIdMap.set(
                                data.provider.id,
                                data.provider.description),
                            projectIdMap: data.project !== null
                                ? this.state.projectIdMap.set(
                                    data.project.id,
                                    data.project.description)
                                : this.state.projectIdMap,
                            status: data.status,
                            protocols: data.provider.protocols.map((item: any) => item.protocol),
                            valueCron: data.cronExpression
                        });
                    }
                });
        }
        this.credentialsData();
        this.providersData();
        this.projectData();
    }

    public render() {
        return (
            <div >
                <Tab menu={{ secondary: true, pointing: true }} panes={
                    [
                        {
                            menuItem: 'Repositories',
                            render: () => {
                                return (
                                    <Tab.Pane attached={false}>
                                        <Form>
                                            <Grid verticalAlign="middle" columns="equal">
                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Repsoitory Name</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={10}>
                                                        <input
                                                            required={!this.state.name ? true : false}
                                                            type="text" name="name"
                                                            value={this.state.name}
                                                            placeholder="Name"
                                                            onChange={this.handlerInputRepository}
                                                            disabled={this.props.readOnly} />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Description</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={10}>
                                                        <input className="select"
                                                            required={!this.state.description ? true : false}
                                                            type="text" name="description"
                                                            value={this.state.description}
                                                            placeholder="Description"
                                                            onChange={this.handlerInputRepository}
                                                            disabled={this.props.readOnly} />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Endpoint</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={10}>
                                                        <input
                                                            required={!this.state.description ? true : false}
                                                            type="text" name="endpoint"
                                                            value={this.state.endpoint}
                                                            placeholder="Endpoint"
                                                            onChange={this.handlerInputRepository}
                                                            disabled={this.props.readOnly} />
                                                    </Grid.Column>
                                                </Grid.Row>

                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Credentials</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={10} >
                                                        <Dropdown
                                                            // className="selectState"
                                                            placeholder="Select the credential"
                                                            fluid
                                                            selection
                                                            options={this.state.credentials.map((credential: any) => {
                                                                return {
                                                                    key: credential.id,
                                                                    text: credential.name,
                                                                    value: credential.name
                                                                };
                                                            })}
                                                            value={
                                                                this.state.credentialIdMap.get(this.state.credentialId)
                                                            }
                                                            onChange={this.handlerDropdownCredential}
                                                            disabled={this.props.readOnly}
                                                        />
                                                    </Grid.Column>
                                                </Grid.Row>

                                                <Grid.Row>
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Project</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={10}>
                                                        <Form.Field>
                                                            <Dropdown
                                                                placeholder="Select the project"
                                                                fluid
                                                                selection

                                                                options={this.state.projects.map((project: any) => {
                                                                    return {
                                                                        key: project.id,
                                                                        text: project.name,
                                                                        value: project.id
                                                                    };
                                                                })}
                                                                value={
                                                                    // this.state.projectIdMap.get(this.state.projectId)
                                                                    this.state.projectId
                                                                }
                                                                onChange={this.handlerDropdownProject}
                                                                disabled={this.props.readOnly}
                                                            />
                                                        </Form.Field>
                                                    </Grid.Column>
                                                </Grid.Row>

                                                <Grid.Row >
                                                    <Grid.Column width={3}>
                                                        <Form.Field required>
                                                            <label>Providers</label>
                                                        </Form.Field>
                                                    </Grid.Column>
                                                    <Grid.Column width={7}>
                                                        <Dropdown
                                                            placeholder="Select the providers"
                                                            fluid
                                                            selection
                                                            options={this.state.providers.map((provider: any) => {
                                                                return {
                                                                    key: provider.id,
                                                                    text: provider.description,
                                                                    value: provider.id
                                                                };
                                                            })}
                                                            value={
                                                                // this.state.providerIdMap.get(this.state.providerId)
                                                                this.state.providerId
                                                            }
                                                            onChange={this.handlerDropdownProvider}
                                                            disabled={this.props.readOnly}
                                                        />
                                                    </Grid.Column>

                                                    <Grid.Column width={4}>
                                                        <Dropdown
                                                            placeholder="Protocol"
                                                            fluid
                                                            selection
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
            </div>
        );
    }
    private handlerInputRepository(e: any) {
        this.props.disableBtn(false);
        switch (e.currentTarget.name) {
            case 'name':
                this.setState({ name: e.currentTarget.value });
                break;
            case 'description':
                this.setState({ description: e.currentTarget.value });
                break;
            case 'endpoint':
                this.setState({ endpoint: e.currentTarget.value });
                break;
            default:
                console.log(e.currentTarget.value);
                break;
        }
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
    private projectData = () => {
        this.props.getAllProjects()
            .then((projects) => {
                const projectOption: Array<{}> = [];
                projects.map((project: any) => {
                    if (project.status || project.id === this.state.projectId) {
                        projectOption.push(project);
                    }
                });
                this.setState({ projects: projectOption });
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

    private handlerDropdownProject?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            this.state.projectIdMap.clear();
            this.props.disableBtn(false);
            const projects = data.options;
            const id = 'id';
            const name = 'name';
            for (let i = 0; this.state.projects.length > i; i++) {
                if (projects !== undefined && projects[i].value === data.value) {
                    if (this.state.projects[i][id] === projects[i].key) {
                        this.setState({
                            projectIdMap:
                                this.state.projectIdMap.set(
                                    this.state.projects[i][id],
                                    this.state.projects[i][name]),
                            projectId: this.state.projects[i][id]
                        });
                    }
                }
            }
        }
    private handlerDropdownProvider?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            console.log('CAMBIO EL PROVIDER');
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

    // Método que ejecuta el alta y la edición de Repositories
    private saveRepository() {
        if (this.state.id === null) {
            const datos = {
                name: this.state.name,
                description: this.state.description,
                endpoint: this.state.endpoint,
                credentialId: this.state.credentialId,
                projectId: this.state.projectId,
                providerId: this.state.providerId,
                protocolId: this.state.protocolId,
                protocols: this.state.protocols,
                cronExpression: this.state.valueCron,
                status: this.state.status,
            };
            return this.props.postRepositories(datos);
        } else {
            const datos = {
                name: this.state.name,
                description: this.state.description,
                endpoint: this.state.endpoint,
                credentialId: this.state.credentialId,
                projectId: this.state.projectId,
                // providerId: this.state.providerId,
                protocolId: this.state.protocolId,
                id: this.state.id,
                // protocols: this.state.protocols,
                cronExpression: this.state.valueCron,
                status: this.state.status,
            };
            return this.props.putRepositories(this.state.id, datos);
        }
    }
    private closeMsg = () => {
        this.setState({ positive: null, error: undefined });
        this.props.disableBtn(false);
    }
}

export default ContentModalRepositories;
