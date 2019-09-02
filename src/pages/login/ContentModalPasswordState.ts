export default class ContentModalPasswordState {
  private _newPassword: string;
  private _confirmPassword: any;
  private _error: any;
  private _hiddenNew: boolean;
  private _hiddenConfirm: boolean;
  constructor(
    newPassword: string,
    confirmPassword: any,
    error: any,
    hiddenNew: boolean,
    hiddenConfirm: boolean
  ) {
    this._newPassword = newPassword;
    this._confirmPassword = confirmPassword;
    this._error = error;
    this._hiddenNew = hiddenNew;
    this._hiddenConfirm = hiddenConfirm;
  }

  get newPassword(): string {
    return this._newPassword;
  }

  set newPassword(newPassword: string) {
    this._newPassword = newPassword;
  }

  get confirmPassword(): any {
    return this._confirmPassword;
  }

  set confirmPassword(confirmPassword: any) {
    this._confirmPassword = confirmPassword;
  }

  get error(): any {
    return this._error;
  }

  set error(error: any) {
    this._error = error;
  }

  get hiddenNew(): boolean {
    return this._hiddenNew;
  }

  set hiddenNew(hiddenNew: boolean) {
    this._hiddenNew = hiddenNew;
  }

  get hiddenConfirm(): boolean {
    return this._hiddenConfirm;
  }

  set hiddenConfirm(hiddenConfirm: boolean) {
    this._hiddenConfirm = hiddenConfirm;
  }
}