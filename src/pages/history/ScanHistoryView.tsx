import { connect } from 'react-redux';
import * as React from 'react';
import { dispatchGetScanHistory } from '../../actions/scanhistory';
import { dispatchGetScanHistoryById } from '../../actions/scanhistory';
import AbmView from '../../components/abm/abmView';
import ScanHistoryViewProps from './ScanHistoryViewProps';
import ScanHistoryViewState from './ScanHistoryViewState';
import ModelDefinition from '../../components/abm/ModelDefinition';

class ScanHistoryView extends React.Component<ScanHistoryViewProps, ScanHistoryViewState> {

    constructor(props: ScanHistoryViewProps) {
        super(props);
        this.state = {
            saveScanModel: null,
            scanId: null,
            refrescar: this.props.getScanHistory(),
            page: 0,
            size: 4,
            scan: [{}],
            countPage: undefined,
            disableBtn: true
        };

        this.receiveAction = this.receiveAction.bind(this);

    }

    public componentDidMount() {
        // this.props.getRoles();
        // this.axiosCountPaginable();
    }

    public getModelDefinition = () => {

        const arrayColumns: Array<{
            label: string,
            property: string,
            visible: boolean,
            type: string
        }> = [
                {
                    label: 'Execution Id',
                    property: 'execution_id',
                    visible: false,
                    type: 'field'
                },
                {
                    label: 'Started',
                    property: 'started_at',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'Finished',
                    property: 'finished_at',
                    visible: true,
                    type: 'fieldArray'
                }
            ];

        const objectModalContent: {
            title: string,
            abm: any
        } = {
            title: '',
            abm: undefined
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
            '/history/'
        );
        return miModel;
    }

    public render() {
        return (
            <div className="scanHistory">
                <AbmView
                    modelDefinition={this.getModelDefinition()}
                    data={this.props.getScanHistory}
                    dataPagination={undefined}
                    actionSave={this.saveScan}
                    actionEdit={(id: number) => this.setState({ scanId: id })}
                    putStatus={undefined}
                    pagination={undefined}
                    totalPages={undefined}
                    allElements={undefined}
                    size={undefined}
                    disableBtn={this.state.disableBtn}
                />
            </div>
        );
    }

    private saveScan = () => this.state.saveScanModel();

    private receiveAction = (saveScanChild: any) => {

        this.setState({ saveScanModel: saveScanChild, scanId: null, disableBtn: true });

    }
}

const mapStateToProps = (state: { scan: { scan: any; }; }, props: any) => {
    return {
        scan: state.scan.scan
    };
};

const mapDispatchToProps = (dispatch: any) => {

    return {
        getScanHistory: () => (dispatch(dispatchGetScanHistory())),
        getScanHistoryById: (id: number | null) => (dispatch(dispatchGetScanHistoryById(id)))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(ScanHistoryView);
