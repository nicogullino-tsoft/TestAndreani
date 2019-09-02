import * as React from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import './stylesAbm.css';
import Btn from '../buttons/btn';
import AbmRowProps from './AbmRowProps';
import AbmRowState from './AbmRowState';
// import { string } from 'prop-types';

const btnEdit = require('../../components/buttons/img/pencil.png');
const btnPassword = require('../../components/buttons/img/password.png');

class AbmRow extends React.Component<AbmRowProps, AbmRowState> {

    constructor(props: AbmRowProps) {
        super(props);
        this.state = {
            dataRow: this.props.data,
            valueCheck: this.props.valueOfCheck
        };
        this.changeStatusRecord = this.changeStatusRecord.bind(this);
    }
    public handleChecked = () => {
        this.props.handleCheckRow(!this.state.valueCheck, this.props.data[this.props.modelDefinition.recordId]);
        this.setState({ valueCheck: !this.state.valueCheck });
    }
    // Cambia el Estado individual
    public changeStatusRecord(e: any) {
        const numberId = parseInt(e.target.previousSibling.value, undefined);
        // this.props.handleSingleState(this.state.dataRow.enabled, numberId);
        if (this.state.dataRow.enabled !== undefined) {
            this.props.handleSingleState(this.state.dataRow.enabled, numberId);
        } else {
            this.props.handleSingleState(this.state.dataRow.status, numberId);
        }
    }

    public onEdit = (e: any) => {
        this.props.actionEdit(e.target.id, undefined);
    }
    public onView = (e: any) => {
        this.props.actionEdit(e.target.parentNode.id, e.target.parentNode.attributes.name.value);
    }

    public onResetPassword = (e: any) => {
        // this.props.actionEdit(e.target.id, e.target.parentNode.attributes.name.value);
    }

    public componentWillReceiveProps(nextProps: any) {

        if (this.props.data !== nextProps.data) {
            this.setState({ dataRow: nextProps.data });
        }

        // if (this.props.valueOfCheck !== nextProps.valueOfCheck) {
        //     this.setState({ valueCheck: nextProps.valueOfCheck });
        // }

        if (this.props.valueOfCheck !== nextProps.valueOfCheck) {
            if (this.props.valueOfCheck !== undefined) {
                this.setState({ valueCheck: false });
            } else {
                this.setState({ valueCheck: true });
            }
        }
    }

    public render() {
        // console.log('                 -->', this.props.data.id);
        return (
            // <Popup
            //     trigger={
            <Table.Row onClick={this.onView} id={this.props.data.id} name="View">
                {this.props.modelDefinition.selectAllEnabled &&
                    <Table.Cell  className="tableChkGrid">
                        <Checkbox checked={this.state.valueCheck} onChange={this.handleChecked} />
                    </Table.Cell>}
                {this.props.modelDefinition.columns.map((element: any) => {
                    return (
                        element.visible ?
                            element.type !== 'field' ?
                                element.type === 'fieldArray' ?
                                    <Table.Cell>
                                        {this.props.data[element.property].map((item: any) =>
                                            item.protocol === undefined ? (item.name === undefined ?
                                                item : item.name) : item.protocol).join(', ')}
                                    </Table.Cell>
                                    : // NO ES UN FIELD-ARRAY 
                                    element.property === 'enabled' || element.property === 'status' ?
                                        <Table.Cell  className="tableBtnGrid">
                                            <Checkbox
                                                value={this.props.data[this.props.modelDefinition.recordId]}
                                                toggle
                                                key={this.props.data[this.props.modelDefinition.recordId]}
                                                onChange={this.changeStatusRecord}
                                                checked={this.state.dataRow.enabled !== undefined
                                                    ? this.state.dataRow.enabled
                                                    : this.state.dataRow.status} />
                                        </Table.Cell>
                                        : // NO ES ENABLED, POR LO TANTO ES EL BOTON EDIT O EL RESET PASSWORD
                                        element.label === 'Edit' ?
                                            <Table.Cell className="tableBtnGrid">
                                                <Btn
                                                    label="Edit"
                                                    img={btnEdit}
                                                    id={this.props.data[element.property]}
                                                    btnState={false}
                                                    onClick={this.onEdit} 
                                                    className="btnButtonGrid"/>
                                            </Table.Cell>
                                            :
                                            <Table.Cell className="tableBtnGrid">
                                                <Btn
                                                    label="Reset"
                                                    img={btnPassword}
                                                    id={this.props.data[element.property]}
                                                    btnState={false}
                                                    onClick={this.onResetPassword} 
                                                    className="btnButtonGrid"/>
                                            </Table.Cell>
                                : // ES UN FIELD
                                <Table.Cell>{
                                    // SI LA PROPERTY ES CREDENTIAL DATA O PROVIDER DATA
                                    (element.property === 'credentialData' ||
                                        element.property === 'providerData' ||
                                        element.property === 'provider' ||
                                        element.property === 'credential') ?
                                        // SI LA PROPERTY ES CREDENTIAL DATA
                                        element.property === 'credentialData' ||
                                            element.property === 'credential'
                                            ? this.props.data[element.property].name
                                            // LA PROPERTY NO ES CREDENTIAN DATA, 
                                            // POR LO TANTO IMPRIMIME PROVIDER DATA.DESCRIPTION
                                            : this.props.data[element.property].description
                                        // CUANDO LAS PROPERTIES SON DIFERENTES 
                                        // A CREDENTIAL DATA Y PROVIDER DATA
                                        : this.props.data[element.property]
                                }</Table.Cell>
                            : null
                    );
                })
                }
            </Table.Row>
            //     }
            //     content={undefined}
            //     basic
            // />

        );
    }
}

export default AbmRow;