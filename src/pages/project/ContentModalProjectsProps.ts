export default class ContentModalProjectsProps {

    constructor(
        public projectId: number | null,
        public readOnly: boolean,
        public disableBtn: (disableBtn: boolean) => void,
        public receiveAction: (saveProject: () => void) => void,
        public getRecordById: (id: number | null) => Promise<void>,
        public postProjects: (datos: object) => Promise<void>,
        public putProjects: (id: number, datos: object) => Promise<void>,
        public getAllRepositories: () => Promise<[{}]>,
        public getAllCredentials: () => Promise<[{}]>,
        public getAllProviders: () => Promise<[{}]>
    ) {

    }
}