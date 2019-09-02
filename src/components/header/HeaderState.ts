export default class HeaderState {
    private _logged: boolean;
    private _userName: string;
    private _editInput: boolean;
    private _activeItem?: string;
    constructor(
        user: string,
        logged: boolean,
        userName: string,
        editInput: boolean,
        activeItem?: string,
    ) {
        this._logged = logged;
        this._userName = userName;
        this._editInput = editInput;
        this._activeItem = activeItem;
    }

    get logged(): boolean {
        return this._logged;
    }

    set logged(logged: boolean) {
        this._logged = logged;
    }

    get userName(): string {
        return this._userName;
    }
    set userName(userName: string) {
        this._userName = userName;
    }

    get activeItem(): string | undefined {
        return this._activeItem;
    }
    set activeItem(activeItem: string | undefined) {
        this._activeItem = activeItem;
    }

    get editInput(): boolean {
        return this._editInput;
    }
    set editInput(editInput: boolean) {
        this._editInput = editInput;
    }
}