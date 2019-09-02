export default class ContentModalProvidersProps {

    constructor(
        public providerId: number | null,
        public readOnly: boolean,
        public disableBtn: (disableBtn: boolean) => void,
        public receiveAction: (saveProvider: () => void) => void,
        public getRecordById: (id: number | null) => Promise<void>,
        public postProviders: (datos: object) => void,
        public putProviders: (id: number, datos: object) => void,
        public postTest: (data: object) => Promise<void>
    ) {

    }
}