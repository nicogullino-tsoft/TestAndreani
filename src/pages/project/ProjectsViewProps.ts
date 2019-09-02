export default class ProvidersViewProps {

    constructor(
        public project: Array<{}>,
        public getCountProject: () => Promise<number>,
        public getProjects: (page: number, size: number) => Promise<[]>,
        public getProjectsById: (id: number | null) => Promise<void>,
        public postProjects: (data: object) => Promise<void>,
        public putProjects: (id: number, data: object) => Promise<void>,
        public putProjectsStatus: (data: object) => Promise<void>,
        public getAllRepositories: () => Promise<[{}]>,
        public getAllCredentials: () => Promise<[{}]>,
        public getAllProviders: () => Promise<[{}]>
    ) {

    }
}