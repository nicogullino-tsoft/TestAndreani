export default class ContentModalRolesState {
    private _id: number | null;
    private _description: string;
    private _enabled: boolean | null;
    private _error: any;
    private _positive: boolean | null;
    private _urlError: boolean;
    private _permissionsAll: string[];
    private _checkAllPermissions: boolean;
    private _permissions?: string[];

    constructor(
        testEnabled: boolean,
        id: number | null,
        description: string,
        enabled: boolean | null,
        error: any,
        positive: boolean | null,
        urlError: boolean,
        permissionsAll: string[],
        checkAllPermissions: boolean,
        permissions?: string[]
    ) {
        this._id = id;
        this._description = description;
        this._enabled = enabled;
        this._error = error;
        this._positive = positive;
        this._urlError = urlError;
        this._permissionsAll = permissionsAll;
        this._checkAllPermissions = checkAllPermissions;
        this._permissions = permissions;
    }

    get id(): number | null {
        return this._id;
    }

    set id(id: number | null) {
        this._id = id;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get enabled(): boolean | null {
        return this._enabled;
    }

    set enabled(enabled: boolean | null) {
        this._enabled = enabled;
    }

    get error(): any {
        return this._error;
    }

    set error(error: any) {
        this._error = error;
    }

    get positive(): boolean | null {
        return this._positive;
    }

    set positive(positive: boolean | null) {
        this._positive = positive;
    }

    get urlError(): boolean {
        return this._urlError;
    }

    set urlError(urlError: boolean) {
        this._urlError = urlError;
    }
    get permissionsAll(): string[] {
        return this._permissionsAll;
    }

    set permissionsAll(permissionsAll: string[]) {
        this._permissionsAll = permissionsAll;
    }

    get permissions(): string[] | undefined {
        return this._permissions;
    }

    set permissions(permissions: string[] | undefined) {
        this._permissions = permissions;
    }

    get checkAllPermissions(): boolean {
        return this._checkAllPermissions;
    }

    set checkAllPermissions(checkAllPermissions: boolean) {
        this._checkAllPermissions = checkAllPermissions;
    }
}