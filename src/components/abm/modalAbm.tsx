import * as React from 'react';
import { Modal, Message } from 'semantic-ui-react';
import './styleModal.css';
import Btn from '../buttons/btn';
import ModalAbmProps from './ModalAbmProps';
import ModalAbmState from './ModalAbmState';

const btnCancel = require('../buttons/img/cancel.png');
const btnSave = require('../buttons/img/save.png');

class ModalAbm extends React.Component<ModalAbmProps, ModalAbmState> {
    constructor(props: ModalAbmProps) {
        super(props);

        this.state = {
            isEnabled: false,
            showModal: this.props.showModal,
            error: null,
            newRecord: this.props.newRecord,
        };
    }
    public componentWillReceiveProps(nextProps: any) {

        if (this.state.showModal !== nextProps.showModal) {
            this.setState({ showModal: nextProps.showModal });
        }

        if (this.props.newRecord !== nextProps.newRecord) {
            this.setState({ newRecord: nextProps.newRecord });
            if (nextProps.newRecord === 'New') {
                this.setState({ isEnabled: true });
            } else {
                this.setState({ isEnabled: false });
            }
        }

        if (nextProps.disabledBtn && nextProps.newRecord !== 'Edit') {
            this.setState({ isEnabled: true });
        } else {
            this.setState({ isEnabled: false });
        }
    }
    public render() {
        return (
            <div >
                <Modal className="pvdModal" open={this.state.showModal}>
                    <Modal.Header>{
                        this.props.modalContent.title !== undefined
                            ? this.state.newRecord + ' ' + this.props.modalContent.title
                            : this.state.newRecord
                    }</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            {this.props.modalContent.abm !== undefined
                                ? this.props.modalContent.abm
                                : this.props.modalContent}
                        </Modal.Description>
                        {this.state.error ?
                            <Message negative onDismiss={this.closeMsg}>
                                <Message.Header>Ups error! {this.state.error}</Message.Header>
                            </Message> : null}
                        <div className="pvdBtn">
                            {!this.props.visibleBtnSave && <Btn
                                id=""
                                label="Save"
                                img={btnSave}
                                onClick={this.save}
                                btnState={this.state.isEnabled !== undefined && this.state.isEnabled} />}
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
    private save = () => {
        this.setState({ isEnabled: true });
        this.props.actionSave().then(() => {
            this.props.close(true);
            this.setState({ error: null, isEnabled: false });

        }).catch((error) => {
            console.log('AQUI ESTOY EN EL MODAL ERROR', error.message);
            if (error.message) {
                this.setState({ error: error.message });
            } else {
                this.setState({ error });
            }
        });

    }
    private closeModal = () => {
        this.setState({ error: null });
        this.props.close(false);
    }

    private closeMsg = () => {
        this.setState({ error: null, isEnabled: false });
    }
}

export default (ModalAbm);
