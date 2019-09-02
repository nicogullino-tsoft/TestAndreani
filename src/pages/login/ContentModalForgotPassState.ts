export default class ContentModalForgotPassState {
  private _email: string;
  private _showModal: boolean;
  constructor(
    email: string,
    showModal: boolean
  ) {
    this._email = email;
    this._showModal = showModal;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get showModal(): boolean {
    return this._showModal;
  }

  set showModal(showModal: boolean) {
    this._showModal = showModal;
  }
}