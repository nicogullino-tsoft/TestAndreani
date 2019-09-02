export default class ScanHistoryViewProps {

    constructor(
        public scan: Array<{}>,
        public getScanHistory: () => Promise<[]>,
        public getScanHistoryById: (id: number | null) => Promise<void>
    ) {

    }
}