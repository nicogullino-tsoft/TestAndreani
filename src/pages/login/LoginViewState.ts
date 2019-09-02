export default class LoginViewState {
    private _userName: string;
    private _password: string;
    private _error: string | boolean | null;
    private _showModal: boolean;
    private _saveRecordModel: any;
    constructor(
        userName: string,
        password: string,
        error: string | boolean | null,
        showModal: boolean,
        saveRecordModel: any
    ) {
        this._userName = userName;
        this._password = password;
        this._error = error;
        this._showModal = showModal;
        this._saveRecordModel = saveRecordModel;
    }

    get userName(): string {
        return this._userName;
    }

    set userName(userName: string) {
        this._userName = userName;
    }

    get password(): string {
        return this._password;
    }

    set password(password: string) {
        this._password = password;
    }

    get error(): string | boolean | null {
        return this._error;
    }

    set error(error: string | boolean | null) {
        this._error = error;
    }

    get showModal(): boolean {
        return this._showModal;
    }

    set showModal(showModal: boolean) {
        this._showModal = showModal;
    }

    get saveRecordModel(): any {
        return this._saveRecordModel;
    }

    set saveRecordModel(saveRecordModel: any) {
        this._saveRecordModel = saveRecordModel;
    }
}