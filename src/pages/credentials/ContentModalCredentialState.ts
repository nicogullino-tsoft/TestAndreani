export default class ContentModalCredentialState {
  private _name: string;
  private _username: string;
  private _password: any;
  private _error: any;
  private _id: number | null;
  private _hidden: boolean;
  private _enabled: boolean;
  constructor(
    name: string,
    username: string,
    password: any,
    error: any,
    id: number | null,
    hidden: boolean,
    enabled: boolean,
  ) {
    this._name = name;
    this._username = username;
    this._password = password;
    this._error = error;
    this._id = id;
    this._hidden = hidden;
    this._enabled = enabled;
  }
  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get password(): any {
    return this._password;
  }

  set password(password: any) {
    this._password = password;
  }

  get error(): any {
    return this._error;
  }

  set error(error: any) {
    this._error = error;
  }

  get id(): number | null {
    return this._id;
  }

  set id(id: number | null) {
    this._id = id;
  }

  get hidden(): boolean {
    return this._hidden;
  }

  set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(enabled: boolean) {
    this._enabled = enabled;
  }
}