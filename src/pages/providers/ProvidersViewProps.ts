export default class ProvidersViewProps {

    constructor(
        public getProviders: () => Promise<[]>,
        public getProviderById: (id: number | null) => Promise<void>,
        public postTest: (data: object) => Promise<void>,
        public postProviders: (datos: object) => void,
        public putProviders: (id: number, datos: object) => void,
        public putProviderStatus: (status: object) => Promise<void>,
    ) {

    }
}