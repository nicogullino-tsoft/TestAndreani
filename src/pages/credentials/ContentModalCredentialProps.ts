export default class ContentModalCredentialProps {

  constructor(
    public credentialId: number | null,
    public readOnly: boolean,
    public disableBtn: (disableBtn: boolean) => void,
    public receiveAction: (e: any) => void,
    public postCredentials: (datos: object) => void,
    public putCredentials: (id: number, datos: object) => void,
    public getRecordById: (data: number) => Promise<void>
  ) {

  }
} 