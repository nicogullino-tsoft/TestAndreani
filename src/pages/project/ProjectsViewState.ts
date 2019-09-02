export default class ProvidersViewState {
    private _saveProjectModel: any;
    private _projectId: number | null;
    private _size: number;
    private _project: Array<{}>;
    private _disableBtn: boolean;
    private _view?: string;
    constructor(
        saveProjectModel: any,
        projectId: number | null,
        size: number,
        project: Array<{}>,
        disableBtn: boolean,
        view?: string
    ) {
        this._saveProjectModel = saveProjectModel;
        this._projectId = projectId;
        this._size = size;
        this._project = project;
        this._disableBtn = disableBtn;
        this._view = view;
    }

    get saveProjectModel(): any {
        return this._saveProjectModel;
    }

    set saveProjectModel(saveProjectModel: any) {
        this._saveProjectModel = saveProjectModel;
    }

    get projectId(): number | null {
        return this._projectId;
    }

    set projectId(projectId: number | null) {
        this._projectId = projectId;
    }

    get size(): number {
        return this._size;
    }

    set size(size: number) {
        this._size = size;
    }

    get project(): Array<{}> {
        return this._project;
    }

    set project(project: Array<{}>) {
        this._project = project;
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