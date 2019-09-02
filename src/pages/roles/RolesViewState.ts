export default class RolesViewState {
    private _saveRoleModel: any;
    private _roleId: number | null;
    private _page: number;
    private _size: number;
    private _role: Array<{}>;
    private _disableBtn: boolean;
    private _countPage?: number;
    private _view?: string;
    constructor(
        saveRoleModel: any,
        roleId: number | null,
        page: number,
        size: number,
        role: Array<{}>,
        disableBtn: boolean,
        countPage?: number,
        view?: string
    ) {
        this._saveRoleModel = saveRoleModel;
        this._roleId = roleId;
        this._page = page;
        this._size = size;
        this._role = role;
        this._disableBtn = disableBtn;
        this._countPage = countPage;
        this._view = view;
    }

    get saveRoleModel(): any {
        return this._saveRoleModel;
    }

    set saveRoleModel(saveRoleModel: any) {
        this._saveRoleModel = saveRoleModel;
    }

    get roleId(): number | null {
        return this._roleId;
    }

    set roleId(roleId: number | null) {
        this._roleId = roleId;
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

    get role(): Array<{}> {
        return this._role;
    }

    set role(role: Array<{}>) {
        this._role = role;
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