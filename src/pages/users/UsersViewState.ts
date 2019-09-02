export default class UsersViewState {
    private _saveUserModel: any;
    private _userId: number | null;
    private _page: number;
    private _size: number;
    private _user: Array<{}>;
    private _disableBtn: boolean;
    private _countPage?: number;
    private _view?: string;
    constructor(
        saveUserModel: any,
        userId: number | null,
        page: number,
        size: number,
        user: Array<{}>,
        disableBtn: boolean,
        countPage?: number,
        view?: string
    ) {
        this._saveUserModel = saveUserModel;
        this._userId = userId;
        this._page = page;
        this._size = size;
        this._user = user;
        this._disableBtn = disableBtn;
        this._countPage = countPage;
        this._view = view;
    }

    get saveUserModel(): any {
        return this._saveUserModel;
    }

    set saveUserModel(saveUserModel: any) {
        this._saveUserModel = saveUserModel;
    }

    get userId(): number | null {
        return this._userId;
    }

    set userId(userId: number | null) {
        this._userId = userId;
    }

    get page(): number {
        return this._page;
    }

    set page(page: number) {
        this._page = page;
    }

    get size(): number {
        return this._size;
    }

    set size(size: number) {
        this._size = size;
    }

    get user(): Array<{}> {
        return this._user;
    }

    set user(user: Array<{}>) {
        this._user = user;
    }

    get disableBtn(): boolean {
        return this._disableBtn;
    }

    set disableBtn(disableBtn: boolean) {
        this._disableBtn = disableBtn;
    }

    get countPage(): number | undefined {
        return this._countPage;
    }

    set countPage(countPage: number | undefined) {
        this._countPage = countPage;
    }

    get view(): string | undefined {
        return this._view;
    }

    set view(view: string | undefined) {
        this._view = view;
    }
}