import * as React from 'react';
import { Table, Checkbox, Grid, Button, Pagination, Dimmer, Loader } from 'semantic-ui-react';
import './stylesAbm.css';
import Btn from '../buttons/btn';
import AbmViewProps from './AbmViewProps';
import AbmViewState from './AbmViewState';
import { randomBytes } from 'crypto';
import ModalAbm from './modalAbm';
import AbmRow from './abmRow';

const btnNew = require('../buttons/img/new.png');

export default class AbmView extends React.Component<AbmViewProps, AbmViewState> {
    constructor(props: AbmViewProps) {
        super(props);
        this.state = {
            newRecord: '',
            stateEnableDisable: true,
            showModal: false,
            valueFatherCheckAll: false,
            activeLoad: false,
            visibled: false,
            itemsSelected: new Map(),
            limiteFinal: undefined,
            checkedEnableDisable: null,
            limiteInicial: 1,
            page: 1,
            oldPage: 1,
            countPage: 0,
            data: [],
            selectAll: []
        };
        this.handlerOnNew = this.handlerOnNew.bind(this);
        this.enableRecord = this.enableRecord.bind(this);

    }

    public componentDidMount() {
        this.loaderActive();
        if (this.props.size !== undefined) {
            this.allElements();
        }
    }

    public render() {
        return (
            <div className="abm">
                <Dimmer active={this.state.activeLoad} inverted>
                    <Loader size="large">Loading</Loader>
                </Dimmer>

                {(this.props.modelDefinition.pageable
                    && this.state.visibled) &&
                    <p>Mostrando {this.state.limiteInicial} a {
                        this.state.limiteFinal} de {
                            this.state.countPage} {
                            this.props.modelDefinition.modalContent.title.toLowerCase() + 's'}
                    </p>}
                <Table>
                    <Table.Header>
                        <Table.Row>
                            {this.props.modelDefinition.selectAllEnabled &&
                                <Table.HeaderCell className="checkHeader">
                                    <Checkbox
                                        onChange={this.handleAllChecked}
                                        checked={this.state.valueFatherCheckAll}
                                    />
                                </Table.HeaderCell>}
                            {this.props.modelDefinition.columns.map((columnHeader: any) => columnHeader.visible &&
                                <Table.HeaderCell className="tableHeader">{columnHeader.label}</Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.data.map((data: any) => {
                                return (
                                    <AbmRow
                                        modelDefinition={this.props.modelDefinition}
                                        data={data}
                                        actionEdit={this.onEdit}
                                        isCheckAll={this.state.valueFatherCheckAll}
                                        handleCheckRow={this.handleCheckRow}
                                        valueOfCheck={
                                            this.state.itemsSelected.get(data[this.props.modelDefinition.recordId])
                                        }
                                        checksSelected={this.state.itemsSelected}
                                        handleSingleState={this.handleCheckedStateSingle} />
                                );
                            })
                        }
                    </Table.Body>
                </Table>
                <Grid verticalAlign="middle" columns="equal">
                    <Grid.Row>
                        <Grid.Column>
                            {
                                this.props.modelDefinition.selectAllEnabled && <div>
                                    <Button.Group size="large" className="margenBtn">
                                        <Button
                                            id="btnEnabled"
                                            value="true"
                                            disabled={this.state.stateEnableDisable}
                                            onClick={this.handleAllCheckedState}
                                        ></Button>
                                        {/* <Button.Or className='btnOr'/> */}
                                        <Button
                                            id="btnDisabled"
                                            value="false"
                                            disabled={this.state.stateEnableDisable}
                                            onClick={this.handleAllCheckedState}
                                        ></Button>
                                    </Button.Group>
                                </div>
                            }
                        </Grid.Column>
                        <Grid.Column className="abm-view-pagination">
                            {
                                (this.props.modelDefinition.pageable
                                    && this.state.visibled) && <Pagination
                                    onClick={this.pageable}
                                    defaultActivePage={1}
                                    firstItem={null}
                                    lastItem={null}
                                    pointing
                                    secondary
                                    totalPages={this.totalPages()}
                                />
                            }
                        </Grid.Column>
                        <Grid.Column className="botonNew">
                            <Btn
                                id={randomBytes}
                                btnState={false}
                                label="New"
                                img={btnNew}
                                onClick={this.handlerOnNew}
                            />
                        </Grid.Column>
                        <ModalAbm
                            close={this.close}
                            showModal={this.state.showModal}
                            newRecord={this.state.newRecord}
                            modalContent={this.props.modelDefinition.modalContent}
                            actionSave={this.props.actionSave}
                            disabledBtn={this.props.disableBtn}
                            visibleBtnSave={this.state.newRecord === 'View' ? true : false} />
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

    /**
     * Loader.
     * *******
     * Se activa el loader mientras se carga la informacion de la tabla, 
     * una vez transcurrido el tiempo seteado, se desactiva. 
     */
    private loaderActive = () => {
        this.setState({ activeLoad: true });
        if (this.props.size !== undefined) {
            this.refreshTable(0, this.props.size);
        } else {
            this.refreshTable();
        }
        setTimeout(
            () => {
                this.setState({ activeLoad: false });
            },
            1500);
    }

    private handleCheckRow = (pmValue: boolean, pmId: number) => {

        if (this.props.dataPagination !== undefined) {
            /**
             * Se declaran:
             * selectAll    --> array de objetos con la informacion de los checks individualmente.
             * mapSelecteds --> map que contiene a los checks que estan enabled.
             * oDataSelect  --> objeto con la informacion de los checks individuales:
             *                          --> value: boolean (enabled / deseabled)
             *                          --> id: number (id que corresponde al check)
             *                          --> page: number (pagina en la cual se encuentra ese check)
             */
            const selectAll: Array<{}> = this.state.selectAll;
            const mapSelecteds = this.state.itemsSelected;
            const oDataSelect: {} = {
                value: pmValue,
                id: pmId,
                page: this.state.page
            };
            const id = 'id';
            const value = 'value';
            const page = 'page';
            let cont = 0;

            // Se evalua el array dependiendo su checked.
            if (pmValue) {
                selectAll.push(oDataSelect);
            } else {
                for (const oneSelect in selectAll) {
                    if (pmId === selectAll[oneSelect][id]) {
                        const index = parseInt(oneSelect, undefined);
                        selectAll.splice(index, 1);
                    }
                }
                if (mapSelecteds.size !== 0) {
                    mapSelecteds.delete(pmId);
                }
            }
            this.setState({ selectAll });

            // Se evalua el array dependiendo su page.
            for (const pageSelect in selectAll) {
                if (this.state.page === selectAll[pageSelect][page]) {
                    mapSelecteds.set(selectAll[pageSelect][id], selectAll[pageSelect][value]);
                    this.setState({ itemsSelected: mapSelecteds });
                    cont++;
                }
            }

            // Para habilitar el boton Check Enabled/Disable Principal.
            // Cambia el estado del Check Enabled/Disable Principal
            if (cont > 1) {
                this.setState({ stateEnableDisable: false });
            } else {
                this.setState({ stateEnableDisable: true });
            }

            // Activa | Desactiva el Check ALL dependiendo de sus Rows activados
            if (cont === this.state.data.length) {
                this.state.data.map((data: any) => {
                    mapSelecteds.set(data[this.props.modelDefinition.recordId], true);
                });
                this.setState({ itemsSelected: mapSelecteds });
                this.setState({ valueFatherCheckAll: true });
            } else if (mapSelecteds.size === 0) {
                mapSelecteds.clear();
                this.setState({ itemsSelected: mapSelecteds });
            } else {
                this.setState({ valueFatherCheckAll: false });
            }

        } else {

            const mapSelecteds = this.state.itemsSelected;
            pmValue ? mapSelecteds.set(pmId, pmValue) : mapSelecteds.delete(pmId);
            this.setState({ itemsSelected: mapSelecteds });

            // Activa | Desactiva el Check ALL dependiendo de sus Rows activados
            if (mapSelecteds.size === this.state.data.length) {
                this.state.data.map((data: any) => {
                    mapSelecteds.set(data[this.props.modelDefinition.recordId], true);
                });
                this.setState({ itemsSelected: mapSelecteds });
                this.setState({ valueFatherCheckAll: true });
            } else if (mapSelecteds.size === 0) {
                mapSelecteds.clear();
                this.setState({ itemsSelected: mapSelecteds });
            } else {
                this.setState({ valueFatherCheckAll: false });
            }

            // Para habilitar el boton Check Enabled/Disable Principal.
            // Cambia el estado del Check Enabled/Disable Principal
            if (mapSelecteds.size > 1) {
                this.setState({ stateEnableDisable: false });
            } else {
                this.setState({ stateEnableDisable: true });
            }
        }
    }
    private handleAllChecked = () => {
        const id = 'id';
        const page = 'page';
        if (this.props.dataPagination !== undefined) {
            const selectAll: Array<{}> = this.state.selectAll;
            const mapSelecteds = this.state.itemsSelected;
            const selectID: number[] = [];

            for (const oneSelect in selectAll) {
                if (selectAll.hasOwnProperty(oneSelect)) {
                    selectID.push(selectAll[oneSelect][id]);
                }
            }

            this.state.data.map((data: any) => {
                const oDataSelect: {} = {
                    value: true,
                    id: data[this.props.modelDefinition.recordId],
                    page: this.state.page
                };
                if (!this.state.valueFatherCheckAll === false) {
                    for (const oneSelect in selectAll) {
                        if (this.state.page === selectAll[oneSelect][page]
                            && data[this.props.modelDefinition.recordId] === selectAll[oneSelect][id]) {
                            const index = parseInt(oneSelect, undefined);
                            selectAll.splice(index, 1);
                        }
                    }
                    mapSelecteds.delete(data[this.props.modelDefinition.recordId]);
                    this.setState({ stateEnableDisable: true });
                } else {
                    mapSelecteds.set(data[this.props.modelDefinition.recordId], true);
                    if (selectID.indexOf(data[this.props.modelDefinition.recordId]) === -1) {
                        selectAll.push(oDataSelect);
                    }
                    this.setState({ stateEnableDisable: false });
                }
            });
            this.setState({ itemsSelected: mapSelecteds });
            this.setState({ selectAll });
        } else {
            const mapSelecteds = this.state.itemsSelected;
            if (!this.state.valueFatherCheckAll === false) {
                mapSelecteds.clear();
                this.setState({ itemsSelected: mapSelecteds });
                this.setState({ stateEnableDisable: true });
            } else {
                this.state.data.map((data: any) => {
                    mapSelecteds.set(data[this.props.modelDefinition.recordId], true);

                });
                this.setState({ itemsSelected: mapSelecteds });
                this.setState({ stateEnableDisable: false });
            }
        }
        this.setState({ valueFatherCheckAll: !this.state.valueFatherCheckAll });
    }

    private handleAllCheckedState = (event: any) => {
        let itemsToArray: number[] = [];
        if (this.props.data !== undefined) {
            itemsToArray = Array.from(this.state.itemsSelected.keys());
        } else {
            const page = 'page';
            const id = 'id';
            for (const oneSelect in this.state.selectAll) {
                if (this.state.page === this.state.selectAll[oneSelect][page]) {
                    itemsToArray.push(parseInt(this.state.selectAll[oneSelect][id], undefined));
                }
            }
        }

        this.enableRecord(event.target.value, itemsToArray);
    }

    private handleCheckedStateSingle = (stateSingleId: boolean, singleId: number) => {
        const arrayID: number[] = [singleId];
        this.enableRecord(!stateSingleId, arrayID);

    }

    /**
     * Calcula la cantidad de paginas que va a tener el componente.
     * ************************************************************
     * Dependiendo el total de datos y la cantidad a mostrar, se va a calcular el numero de paginas del paginador.
     */
    private totalPages = () => {
        if (this.props.size !== undefined) {
            // if (!Number.isInteger(this.state.countPage / this.props.size)) {
            //     return (Math.round(this.state.countPage / this.props.size) + 1);
            // } else {
            //     return (this.state.countPage / this.props.size);
            // }
            if (this.state.countPage % this.props.size === 0) {
                return this.state.countPage / this.props.size;
            } else {
                if (this.state.countPage / this.props.size >= Math.round(this.state.countPage / this.props.size)) {
                    return (Math.round(this.state.countPage / this.props.size) + 1);
                } else {
                    return Math.round(this.state.countPage / this.props.size);
                }
            }
        } else {
            return 0;
        }
    }

    /**
     * Refresca la tabla.
     * ******************
     * Recibe dos parametros opcionales, los cuales van a depender si el componente posee paginador o no.
     * Si posee paginador se le tiene que pasar el numero de pagina (page) y la cantidad a mostrar (size).
     */
    private refreshTable = (page?: number, size?: number) => {
        if (this.props.data !== undefined && page === undefined && size === undefined) {
            this.props.data().then((data: any) => this.setState({ data }));
        } else {
            if (this.props.dataPagination !== undefined && page !== undefined && size !== undefined) {
                this.props.dataPagination(page, size).then((data: any) => {
                    this.setState({ data, page });
                    if (page === 0) {
                        this.limiteFinal(1);
                    } else {
                        this.allElements();
                        setTimeout(
                            () => {
                                this.limiteFinal((page + 1));
                            },
                            1000);

                    }
                });
            }
        }
    }

    /**
     * Se obtiene el total de datos alojados en la base de datos.
     * **********************************************************
     */
    private allElements = () => {
        if (this.props.allElements !== undefined) {
            this.props.allElements().then((countPage: any) => {
                const count = 'count';
                this.setState({ countPage: countPage[count] });
                if (this.props.size !== undefined
                    && this.props.size < this.state.countPage) {
                    this.setState({ visibled: true });
                } else {
                    this.setState({ visibled: false });
                }
            });
        }
    }

    private pagination = (e: any) => {
        // if (this.props.size !== undefined) {
        //     let num: number;
        //     if (!Number.isInteger(this.state.countPage / this.props.size)) {
        //         num = this.state.countPage / this.props.size;
        //     } else {
        //         num = 0;
        //     }
        //     const num1: number = num;
        //     if (parseInt(e.target.attributes.value.value, 10) >= 1
        //         && parseInt(e.target.attributes.value.value, 10) <= num1
        //         ? Math.round(this.state.countPage / this.props.size) + 1
        //         : this.state.countPage / this.props.size) {
        //         const page = parseInt(e.target.attributes.value.value, 10) - 1;
        //         this.refreshTable(page, this.props.size);
        //     }
        // }
        if (this.props.size !== undefined) {
            const num: number = this.state.countPage / this.props.size;
            if (parseInt(e.target.attributes.value.value, undefined) >= 1
                && parseInt(e.target.attributes.value.value, undefined) <= num
                ? Math.round(this.state.countPage / this.props.size) + 1
                : this.state.countPage / this.props.size) {
                const page = parseInt(e.target.attributes.value.value, undefined) - 1;
                this.refreshTable(page, this.props.size);
            }
        }
    }

    /**
     * Mostrando --> se calcula el limite final.
     * *****************************************
     * Recibe como argumento la pagina solicitada.
     * Variables:
     * limiteFinal : number --> va a contener el limite final de los datos mostrados en la tabla,
     * dependiendo de la pagina en la que se esta posicionado.
     * finalPage : number --> va a contener el numero de la ultima pagina.
     * resto : number --> va a contener el resto de la division entre el total de datos * n° de paginas / el size.
     */
    private limiteFinal(page: number) {
        let limiteFinal: number = 0;
        const finalPage: number = this.totalPages();
        if (this.props.size !== undefined) {
            // const resto = this.state.countPage % this.props.size;
            if (page === 1) {
                if (this.props.size > this.state.countPage) {
                    limiteFinal = this.state.countPage;
                } else {
                    limiteFinal = this.props.size;
                }
            } else if (page === finalPage) {
                // if (this.props.size * page === this.state.countPage) {
                limiteFinal = this.state.countPage;
                // }
                // else {
                //     limiteFinal = Math.round(this.state.countPage / this.props.size) + resto;
                // }
            } else {
                limiteFinal = this.props.size * page;
            }
        }
        this.setState({ limiteFinal });
    }

    /**
     * Mostrando --> se calcula el limite inicial.
     * *******************************************
     * Recibe como argumento la pagina solicitada.
     * Variables:
     * limiteFinal : number --> va a contener el limite final de los datos mostrados en la tabla,
     * dependiendo de la pagina en la que se esta posicionado.
     * finalPage : number --> va a contener el numero de la ultima pagina.
     * resto : number --> va a contener el resto de la division entre el total de datos * n° de paginas / el size.
     */
    private limiteInicial = (page: number) => {
        if (this.props.size !== undefined) {
            if (page >= this.state.page
                && page > 1) {
                this.setState({
                    limiteInicial: ((page - 1)
                        * this.props.size) + 1
                });
                this.setState({ oldPage: this.state.page, page });
            } else {
                if (page === 1) {
                    this.setState({ limiteInicial: 1 });
                } else {
                    this.setState({ limiteInicial: this.state.limiteInicial - this.props.size });
                }
            }
        }
    }

    private pageable = (e: any) => {
        if (this.state.limiteFinal !== undefined
            && this.props.size !== undefined) {
            this.pagination(e);
            this.limiteFinal(parseInt(e.target.attributes.value.value, undefined));
            this.limiteInicial(parseInt(e.target.attributes.value.value, undefined));
            this.setState({ oldPage: this.state.page, page: parseInt(e.target.attributes.value.value, undefined) });
            const page = 'page';
            const selectAll: Array<{}> = this.state.selectAll;
            let cont = 0;
            for (const oneSelect in selectAll) {
                if (parseInt(e.target.attributes.value.value, undefined) === (selectAll[oneSelect][page] + 1)) {
                    cont++;
                }
            }

            if (cont > 1) {
                this.setState({ stateEnableDisable: false });
            } else {
                this.setState({ stateEnableDisable: true });
            }

            if (cont === this.props.size) {
                this.setState({ valueFatherCheckAll: true });
            } else {
                this.setState({ valueFatherCheckAll: false });
            }
        }
    }

    private onEdit = (id: number, view: string | undefined) => {
        if (view !== undefined) {
            this.props.actionEdit(id, view);
            this.setState({ showModal: true, newRecord: view });
        } else {
            this.props.actionEdit(id, undefined);
            this.setState({ showModal: true, newRecord: 'Edit' });
        }
    }

    private handlerOnNew() {
        this.setState({ showModal: true, newRecord: 'New' });
    }

    private close = (refresh: boolean) => {
        this.setState({ showModal: false });
        if (refresh) {
            if (this.props.size !== undefined) {
                if (this.state.countPage === this.props.size && this.state.page === 0) {
                    this.setState({ visibled: true });
                    this.refreshTable(1, this.props.size);
                }
                this.refreshTable(this.state.page, this.props.size);
            } else {
                this.refreshTable();
            }
        }
    }

    private enableRecord(statusChange: boolean, itemsToArray: number[]) {
        let mapSelecteds = new Map();
        const body = {
            ids: itemsToArray,
            status: statusChange
        };
        if (this.props.putStatus !== undefined) {
            this.props.putStatus(body).then(() => {
                this.setState({ stateEnableDisable: true, valueFatherCheckAll: false });
                const id = 'id';
                if (this.props.dataPagination !== undefined) {
                    const selectAll: Array<{}> = this.state.selectAll;
                    mapSelecteds = this.state.itemsSelected;
                    itemsToArray.map((data: any) => {
                        for (const oneSelect in selectAll) {
                            if (data === selectAll[oneSelect][id]) {
                                const index = parseInt(oneSelect, undefined);
                                selectAll.splice(index, 1);
                            }
                        }
                        mapSelecteds.delete(data);
                    });
                    this.setState({ itemsSelected: mapSelecteds, selectAll });
                    this.refreshTable(this.state.page, this.props.size);
                } else {
                    this.setState({ itemsSelected: mapSelecteds });
                    this.refreshTable();
                }
            });
        }
        // .catch(error => {
        //     if (error.response.data.message) {
        //         this.setState({ error: error.response.data.message })
        //     } else {
        //         this.setState({ error })
        //     }
        // });
    }
}
