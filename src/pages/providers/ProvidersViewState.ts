export default class ProvidersViewState {
    private _saveProviderModel: any;
    private _providerId: number | null;
    private _disableBtn: boolean;
    private _view?: string;
    constructor(
        saveProviderModel: any,
        refrescar: any,
        providerId: number | null,
        disableBtn: boolean,
        view?: string
    ) {
        this._saveProviderModel = saveProviderModel;
        this._providerId = providerId;
        this._disableBtn = disableBtn;
        this._view = view;
    }

    get saveProviderModel(): any {
        return this._saveProviderModel;
    }

    set saveProviderModel(saveProviderModel: any) {
        this._saveProviderModel = saveProviderModel;
    }

    get providerId(): number | null {
        return this._providerId;
    }

    set providerId(providerId: number | null) {
        this._providerId = providerId;
    }

    get disableBtn(): boolean {
        return this._disableBtn;
    }

    set disableBtn(disableBtn: boolean) {
        this._disableBtn = disableBtn;
    }

    get view(): string | undefined {
        return this._view;
    }

    set view(view: string | undefined) {
        this._view = view;
    }
}