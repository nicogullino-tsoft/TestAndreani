export default class ContentModalUsersState {
    private _id: number | null;
    private _username: string;
    private _firstname: string;
    private _lastname: string;
    private _password: string;
    private _hidden: boolean;
    private _email: string;
    private _authenticationType: string;
    private _enabled: boolean | null;
    private _error: any;
    private _rolesAll: Array<{}>;
    private _permissionsAll: string[];
    private _checkAllPermissions: boolean;
    private _permissions: string[];
    private _roles: string[];

    constructor(
        id: number | null,
        username: string,
        firstname: string,
        lastname: string,
        password: string,
        hidden: boolean,
        email: string,
        enabled: boolean | null,
        error: any,
        authenticationType: string,
        rolesAll: Array<{}>,
        permissionsAll: string[],
        checkAllPermissions: boolean,
        permissions: string[],
        roles: string[]
    ) {
        this._id = id;
        this._username = username;
        this._firstname = firstname;
        this._lastname = lastname;
        this._password = password;
        this._hidden = hidden;
        this._email = email;
        this._enabled = enabled;
        this._error = error;
        this._authenticationType = authenticationType;
        this._rolesAll = rolesAll;
        this._permissionsAll = permissionsAll;
        this._roles = roles;
        this._permissions = permissions;
        this._checkAllPermissions = checkAllPermissions;
    }

    get id(): number | null {
        return this._id;
    }

    set id(id: number | null) {
        this._id = id;
    }

    get username(): string {
        return this._username;
    }

    set username(username: string) {
        this._username = username;
    }

    get firstname(): string {
        return this._firstname;
    }

    set firstname(firstname: string) {
        this._firstname = firstname;
    }

    get lastname(): string {
        return this._lastname;
    }

    set lastname(lastname: string) {
        this._lastname = lastname;
    }

    get password(): string {
        return this._password;
    }

    set password(password: string) {
        this._password = password;
    }

    get hidden(): boolean {
        return this._hidden;
    }
    
    set hidden(hidden: boolean) {
        this._hidden = hidden;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get authenticationType(): string {
        return this._authenticationType;
    }

    set authenticationType(authenticationType: string) {
        this._authenticationType = authenticationType;
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

    get roles(): string[] {
        return this._roles;
    }

    set roles(roles: string[]) {
        this._roles = roles;
    }

    get rolesAll(): Array<{}> {
        return this._rolesAll;
    }

    set rolesAll(rolesAll: Array<{}>) {
        this._rolesAll = rolesAll;
    }

    get permissionsAll(): string[] {
        return this._permissionsAll;
    }

    set permissionsAll(permissionsAll: string[]) {
        this._permissionsAll = permissionsAll;
    }

    get permissions(): string[] {
        return this._permissions;
    }

    set permissions(permissions: string[]) {
        this._permissions = permissions;
    }

    get checkAllPermissions(): boolean {
        return this._checkAllPermissions;
    }
    
    set checkAllPermissions(checkAllPermissions: boolean) {
        this._checkAllPermissions = checkAllPermissions;
    }

}