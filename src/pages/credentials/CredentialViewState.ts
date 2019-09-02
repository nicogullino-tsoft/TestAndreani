export default class CredentialViewState {
  private _saveRecordModel: any;
  private _credentialId: number | null;
  private _disableBtn: boolean;
  private _view?: string;
  constructor(
    saveRecordModel: any,
    credentialId: number | null,
    disableBtn: boolean,
    view?: string
  ) {
    this._saveRecordModel = saveRecordModel;
    this._credentialId = credentialId;
    this._disableBtn = disableBtn;
    this._view = view;
  }
  get saveRecordModel(): any {
    return this._saveRecordModel;
  }

  set saveRecordModel(saveRecordModel: any) {
    this._saveRecordModel = saveRecordModel;
  }

  get credentialId(): number | null {
    return this._credentialId;
  }

  set credentialId(credentialId: number | null) {
    this._credentialId = credentialId;
  }

  get disableBtn(): boolean {
    return this._disableBtn;
  }

  set disableBtn(disableBtn: boolean) {
    this._disableBtn = disableBtn;
  }

  get view(): string | undefined {
    return this._view;
  }

  set view(view: string | undefined) {
    this._view = view;
  }
}