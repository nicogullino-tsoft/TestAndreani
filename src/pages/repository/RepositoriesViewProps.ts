export default class RepositoriesViewProps {

  constructor(
    public repository: Array<{}>,
    public getRepositories: (page: number, size: number) => Promise<[]>,
    public getRepositoriesById: (id: number | null) => Promise<void>,
    public postRepositories: (data: object) => Promise<void>,
    public putRepositories: (repositoryId: number | null, data: object) => Promise<void>,
    public putRepositoriesStatus: (data: object) => Promise<void>,
    public getAllCredentials: () => Promise<[{}]>,
    public getAllProviders: () => Promise<[{}]>,
    public getAllProjects: (page?: number, size?: number) => Promise<[{}]>,
    public getCountRepository: () => Promise<number>

  ) {
  }
}
