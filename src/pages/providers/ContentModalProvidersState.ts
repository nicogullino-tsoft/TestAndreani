export default class ContentModalProvidersState {
    private _testEnabled: boolean;
    private _id: number | null;
    private _description: string;
    private _enabled: boolean | null;
    private _urlBase: string;
    private _error: any;
    private _positive: boolean | null;
    private _urlError: boolean;
    private _oldUrl: string;
    private _protocols?: string | number | boolean | Array<string | number | boolean>;
    constructor(
        testEnabled: boolean,
        id: number | null,
        description: string,
        enabled: boolean | null,
        urlBase: string,
        error: any,
        positive: boolean | null,
        urlError: boolean,
        oldUrl: string,
        protocols?: string | number | boolean | Array<string | number | boolean>
    ) {
        this._testEnabled = testEnabled;
        this._id = id;
        this._description = description;
        this._enabled = enabled;
        this._urlBase = urlBase;
        this._error = error;
        this._positive = positive;
        this._urlError = urlError;
        this._oldUrl = oldUrl;
        this._protocols = protocols;
    }

    get testEnabled(): boolean {
        return this._testEnabled;
    }

    set testEnabled(testEnabled: boolean) {
        this._testEnabled = testEnabled;
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

    get url_base(): string {
        return this._urlBase;
    }

    set url_base(urlBase: string) {
        this._urlBase = urlBase;
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

    get oldUrl(): string {
        return this._oldUrl;
    }

    set oldUrl(oldUrl: string) {
        this._oldUrl = oldUrl;
    }

    get protocols(): string | number | boolean | Array<string | number | boolean> | undefined {
        return this._protocols;
    }

    set protocols(protocols: string | number | boolean | Array<string | number | boolean> | undefined) {
        this._protocols = protocols;
    }
}