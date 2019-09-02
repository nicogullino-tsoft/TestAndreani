export default class ModalAbmProps {

  constructor(
    public newRecord: any,
    public modalContent: any,
    public showModal: boolean,
    public visibleBtnSave: boolean,
    public actionSave: () => Promise<void>,
    public close: (refresh: boolean) => void,
    public disabledBtn?: boolean
  ) {

  }
}