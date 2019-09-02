import * as React from 'react';
import { Dropdown, Form, Grid, Message, DropdownProps } from 'semantic-ui-react';
import Btn from '../../components/buttons/btn';
import ContentModalProvidersState from './ContentModalProvidersState';
import ContentModalProvidersProps from './ContentModalProvidersProps';

const btnCheck = require('../../components/buttons/img/check.png');

const providerProtocolTypes = [
    { key: 'g', text: 'GIT', value: 'git' },
    { key: 's', text: 'SVN', value: 'svn' }
];

const errorInput = {
    backgroundColor: '#fff6f6',
    borderColor: '#e0b4b4',
    color: '#9f3a38',
    boxShadow: 'none'
};
class ContentModalProvider extends React.Component<ContentModalProvidersProps, ContentModalProvidersState> {
    constructor(props: ContentModalProvidersProps) {
        super(props);
        this.state = {
            testEnabled: false,
            id: this.props.providerId,
            description: '',
            enabled: null,
            url_base: '',
            protocols: undefined,
            error: null,
            positive: false,
            urlError: false,
            oldUrl: ''
        };

        this.handlerInputProvider = this.handlerInputProvider.bind(this);
        this.saveProvider = this.saveProvider.bind(this);

    }
    public componentDidMount() {
        this.props.receiveAction(this.saveProvider);
        if (this.state.id !== null) {
            this.props.getRecordById(this.props.providerId).then((data: any) => {
                if (data) {
                    this.setState({
                        description: data.description,
                        enabled: data.enabled,
                        id: data.id,
                        protocols: data.protocols.map((item: any) => item.protocol),
                        url_base: data.url_base,
                        oldUrl: data.url_base,
                        testEnabled: true
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
                            <Grid.Column width={6}>
                                <Form.Field required>
                                    <label >Provider Name </label>
                                    <input
                                        data-style={!this.state.description ? errorInput : null}
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        placeholder="Description"
                                        onChange={this.handlerInputProvider}  
                                        disabled={this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Form.Field required>
                                    <label>Base URL </label>
                                    <input
                                        data-style={!this.state.url_base || this.state.urlError ? errorInput : null}
                                        type="text"
                                        name="url_base"
                                        value={this.state.url_base}
                                        placeholder="Url Base"
                                        onChange={this.handlerInputProvider}  
                                        disabled={this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={7} id="btnModal">
                                <Btn
                                    id={Math.random()}
                                    label="Test"
                                    img={btnCheck}
                                    btnState={this.state.testEnabled}
                                    onClick={this.postTest} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <label>Type </label>
                            <Grid.Column width={7} className="protocolsType">

                                <Form.Field required>
                                    <Dropdown
                                        name="protocols"
                                        className="selectState"
                                        placeholder="Select your providers"
                                        fluid
                                        multiple
                                        selection
                                        options={providerProtocolTypes}
                                        value={this.state.protocols}
                                        onChange={this.handlerDropdown}  
                                        disabled={this.props.readOnly}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                {this.state.positive ?
                    <Message
                        positive
                        onDismiss={this.closeMsg}>
                        <Message.Header>Correct URL!</Message.Header>
                    </Message> : null}
                {this.state.error ?
                    <Message
                        negative
                        onDismiss={this.closeMsg}>
                        <Message.Header>Ups error! {this.state.error}</Message.Header>
                    </Message> : null}
            </div >
        );
    }

    private handlerInputProvider(e: any) {
        // this.setState({ [e.target.name]: e.target.value });
        this.props.disableBtn(false);
        switch (e.currentTarget.name) {
            case 'description':
                this.setState({ description: e.currentTarget.value });
                break;
            case 'url_base':
                this.setState({ url_base: e.currentTarget.value });
                break;

            default:
                console.log(e.currentTarget.value);
                break;
        }
        if (e.target.name === 'url_base') {
            const valueUrl = e.target.value;
            const expUrl1 = /((http|https):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/gi;
            const expUrl2 = /(http|https):\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}/gi;
            const regUrl1 = new RegExp(expUrl1);
            const regUrl2 = new RegExp(expUrl2);
            if (valueUrl.match(regUrl1) || valueUrl.match(regUrl2)) {
                this.setState({ urlError: false });
            } else {
                this.setState({ urlError: true });
            }
            if (this.state.oldUrl === valueUrl) {
                this.setState({ testEnabled: true });
            } else {
                this.setState({ testEnabled: false });
            }
        }
    }

    private handlerDropdown?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void =
        (event, data) => {
            this.props.disableBtn(false);
            this.setState({ protocols: data.value });
        }

    // Método que ejecuta el alta y la edición de Proveedores
    //  || this.state.protocols.length === 0
    private saveProvider() {
        // if (!(this.state.description && this.state.url_base) ||
        //     this.state.urlError ||
        //     this.state.protocols === undefined) {
        //     this.setState({ error: 'Incomplete or erroneous fields' });
        // } else {
            if (this.state.id === null) {
                const datos = {
                    description: this.state.description,
                    protocols: this.state.protocols,
                    url_base: this.state.url_base
                };
                return this.props.postProviders(datos);
            } else {
                const datos = {
                    description: this.state.description,
                    enabled: this.state.enabled,
                    protocols: this.state.protocols,
                    url_base: this.state.url_base
                };
                return this.props.putProviders(this.state.id, datos);
            }
        // }

    }
    private postTest = () => {
        const data = {
            description: this.state.description,
            protocols: this.state.protocols,
            url_base: this.state.url_base
        };
        this.props.postTest(data).then(() => {
            this.setState({
                error: null,
                positive: true,
                testEnabled: true,
                oldUrl: this.state.url_base
            });
        }).catch((error) => {
            if (error.response.data.message) {
                this.setState({ error: error.response.data.message, positive: false });
            } else {
                this.setState({ error, positive: false });
            }
        });
    }

    private closeMsg = () => {
        this.setState({ positive: null, error: null });
        this.props.disableBtn(false);
    }
}

export default ContentModalProvider;