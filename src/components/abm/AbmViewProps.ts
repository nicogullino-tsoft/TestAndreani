
export default class AbmViewProps {

    constructor(
        public modelDefinition: any,
        public actionSave: () => Promise<void>,
        public actionEdit: (id: number, view: string | undefined) => void,
        public putStatus?: (body: object) => Promise<void>,
        public size?: number,
        public totalPages?: number,
        public allElements?: () => Promise<number>,
        public data?: () => Promise<[]>,
        public dataPagination?: (page: number, size: number) => Promise<[]>,
        public pagination?: (e: any) => void,
        public disableBtn?: boolean
    ) {

    }
}