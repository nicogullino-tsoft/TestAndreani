export default class CredentialViewProps {

  constructor(
    public credential: any,
    public getCredentials: () => Promise<[]>,
    public getCredentialById: (id: number) => Promise<any>,
    public postCredentials: (datos: object) => void,
    public putCredentials: (id: number, datos: any) => void,
    public putCredentialStatus: (body: object) => Promise<void>
  ) {

  }
}