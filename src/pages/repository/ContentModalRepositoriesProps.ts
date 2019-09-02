export default class ContentModalRepositoriesProps {
  constructor(
    public repositoryId: number | null,
    public readOnly: boolean,
    public disableBtn: (disableBtn: boolean) => void,
    public receiveAction: (saveRepository: () => void) => void,
    public getRecordById: (id: number | null) => Promise<void>,
    public postRepositories: (datos: object) => void,
    public putRepositories: (repositoryId: number | null, data: object) => Promise<void>,
    public getAllCredentials: () => Promise<[{}]>,
    public getAllProviders: () => Promise<[{}]>,
    public getAllProjects: (page?: number, size?: number) => Promise<[{}]>
  ) {

  }
}