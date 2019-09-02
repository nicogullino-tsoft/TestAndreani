export default class ScanHistoryViewState {
    private _saveScanModel: any;
    private _refrescar: any;
    private _scanId: number | null;
    private _page: number;
    private _size: number;
    private _scan: Array<{}>;
    private _disableBtn: boolean;
    private _countPage?: number;
    constructor(
        saveScanModel: any,
        refrescar: any,
        scanId: number | null,
        page: number,
        size: number,
        scan: Array<{}>,
        disableBtn: boolean,
        countPage?: number
    ) {
        this._saveScanModel = saveScanModel;
        this._refrescar = refrescar;
        this._scanId = scanId;
        this._page = page;
        this._size = size;
        this._scan = scan;
        this._disableBtn = disableBtn;
        this._countPage = countPage;
    }

    get saveScanModel(): any {
        return this._saveScanModel;
    }

    set saveScanModel(saveScanModel: any) {
        this._saveScanModel = saveScanModel;
    }

    get refrescar(): any {
        return this._refrescar;
    }

    set refrescar(refrescar: any) {
        this._refrescar = refrescar;
    }

    get scanId(): number | null {
        return this._scanId;
    }

    set scanId(scanId: number | null) {
        this._scanId = scanId;
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

    get scan(): Array<{}> {
        return this._scan;
    }

    set scan(scan: Array<{}>) {
        this._scan = scan;
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
}