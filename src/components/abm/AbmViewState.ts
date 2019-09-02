export default class AbmViewState {
    private _showModal: boolean;
    private _newRecord: string;
    private _stateEnableDisable: boolean;
    private _valueFatherCheckAll: boolean;
    private _itemsSelected: any;
    private _limiteInicial: number;
    private _page: number;
    private _oldPage: number | null;
    private _data: Array<{}>;
    private _activeLoad: boolean;
    private _checkedEnableDisable: any;
    private _selectAll: Array<{}>;
    private _countPage: number;
    private _visibled: boolean;
    private _limiteFinal?: number;
    constructor(
        showModal: boolean,
        newRecord: string,
        stateEnableDisable: boolean,
        valueFatherCheckAll: boolean,
        itemsSelected: any,
        limiteInicial: number,
        page: number,
        oldPage: number | null,
        data: Array<{}>,
        activeLoad: boolean,
        checkedEnableDisable: any,
        selectAll: Array<{}>,
        countPage: number,
        visibled: boolean,
        limiteFinal?: number,
    ) {
        this._showModal = showModal;
        this._newRecord = newRecord;
        this._stateEnableDisable = stateEnableDisable;
        this._valueFatherCheckAll = valueFatherCheckAll;
        this._itemsSelected = itemsSelected;
        this._limiteInicial = limiteInicial;
        this._page = page;
        this._oldPage = oldPage;
        this._data = data;
        this._activeLoad = activeLoad;
        this._checkedEnableDisable = checkedEnableDisable;
        this._selectAll = selectAll;
        this._countPage = countPage;
        this._visibled = visibled;
        this._limiteFinal = limiteFinal;
    }

    get showModal(): boolean {
        return this._showModal;
    }

    set showModal(showModal: boolean) {
        this._showModal = showModal;
    }

    get newRecord(): string {
        return this._newRecord;
    }

    set newRecord(newRecord: string) {
        this._newRecord = newRecord;
    }

    get stateEnableDisable(): boolean {
        return this._stateEnableDisable;
    }

    set stateEnableDisable(stateEnableDisable: boolean) {
        this._stateEnableDisable = stateEnableDisable;
    }

    get valueFatherCheckAll(): boolean {
        return this._valueFatherCheckAll;
    }

    set valueFatherCheckAll(valueFatherCheckAll: boolean) {
        this._valueFatherCheckAll = valueFatherCheckAll;
    }

    get itemsSelected(): any {
        return this._itemsSelected;
    }

    set itemsSelected(itemsSelected: any) {
        this._itemsSelected = itemsSelected;
    }

    get limiteInicial(): number {
        return this._limiteInicial;
    }

    set limiteInicial(limiteInicial: number) {
        this._limiteInicial = limiteInicial;
    }

    get page(): number {
        return this._page;
    }

    set page(page: number) {
        this._page = page;
    }

    get oldPage(): number | null {
        return this._oldPage;
    }

    set oldPage(oldPage: number | null) {
        this._oldPage = oldPage;
    }

    get data(): Array<{}> {
        return this._data;
    }

    set data(data: Array<{}>) {
        this._data = data;
    }

    get activeLoad(): boolean {
        return this._activeLoad;
    }
    set activeLoad(activeLoad: boolean) {
        this._activeLoad = activeLoad;
    }

    get checkedEnableDisable(): any {
        return this._checkedEnableDisable;
    }
    set checkedEnableDisable(checkedEnableDisable: any) {
        this._checkedEnableDisable = checkedEnableDisable;
    }

    get selectAll(): Array<{}> {
        return this._selectAll;
    }

    set selectAll(selectAll: Array<{}>) {
        this._selectAll = selectAll;
    }

    get countPage(): number {
        return this._countPage;
    }

    set countPage(countPage: number) {
        this._countPage = countPage;
    }

    get visibled(): boolean {
        return this._visibled;
    }
    
    set visibled(visibled: boolean) {
        this._visibled = visibled;
    }

    get limiteFinal(): number | undefined {
        if (this._limiteFinal !== undefined) {
            return this._limiteFinal;
        } else {
            return undefined;
        }
    }
    set limiteFinal(alimiteFinal: number | undefined) {
        this._limiteFinal = alimiteFinal;
    }
}