export default class ModalAbmState {

  constructor(
    public showModal: boolean,
    public error: any,
    public newRecord: string,
    public isEnabled?: boolean
    ) {

  }

}