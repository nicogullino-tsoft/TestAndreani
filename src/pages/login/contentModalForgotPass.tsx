import * as React from 'react';
import { Form, Grid, Modal } from 'semantic-ui-react';
import ContentModalForgotPassProps from './ContentModalForgotPassProps';
import ContentModalForgotPassState from './ContentModalForgotPassState';
// import axios from '../../api';
import Btn from '../../components/buttons/btn';

const btnCancel = require('../../components/buttons/img/cancel.png');
const btnSubmit = require('../../components/buttons/img/submit.png');

class ContentModalForgotPass extends React.Component<ContentModalForgotPassProps, ContentModalForgotPassState> {

    constructor(props: ContentModalForgotPassProps) {
        super(props);
        this.state = {
            email: '',
            showModal: this.props.showModal
        };

        this.handlerInputEmail = this.handlerInputEmail.bind(this);
    }

    public componentWillReceiveProps(nextProps: any) {
        if (this.state.showModal !== nextProps.showModal) {
            this.setState({ showModal: nextProps.showModal });
        }
    }

    public render() {
        return (
            <div >
                <Modal className="pvdModal" open={this.state.showModal}>
                    <Modal.Header>Password recovered</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form>
                                <Grid verticalAlign="middle" columns="equal">
                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            <Form.Field required>
                                                <label>Email</label>
                                            </Form.Field>
                                        </Grid.Column>
                                        <Grid.Column width={10}>
                                            <input
                                                type="text"
                                                name="email"
                                                value={this.state.email}
                                                placeholder="Email"
                                                onChange={this.handlerInputEmail} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        </Modal.Description>
                        <div className="pvdBtn">
                            <Btn
                                id=""
                                label="Submit"
                                img={btnSubmit}
                                onClick={this.submitEmail}
                                btnState={false} />
                            <Btn
                                id=""
                                label="Cancel"
                                img={btnCancel}
                                onClick={this.closeModal}
                                btnState={false} />
                        </div>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }

    private handlerInputEmail(e: any) {
        this.setState({ email: e.currentTarget.value });
    }

    private submitEmail = () => {
        // axios.post('users/', this.state.email);
        this.props.close();
    }

    private closeModal = () => {
        this.setState({ showModal: false });
    }
}

export default ContentModalForgotPass;