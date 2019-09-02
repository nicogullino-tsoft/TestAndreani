export default class RepositoriesViewState {
    private _saveRepositoryModel: any;
    private _repositoryId: number | null;
    private _size: number;
    private _repository: Array<{}>;
    private _disableBtn: boolean;
    private _view?: string;
    constructor(
        saveRepositoryModel: any,
        repositoryId: number | null,
        size: number,
        repository: Array<{}>,
        disableBtn: boolean,
        view?: string
    ) {
        this._saveRepositoryModel = saveRepositoryModel;
        this._repositoryId = repositoryId;
        this._size = size;
        this._repository = repository;
        this._disableBtn = disableBtn;
        this._view = view;
    }

    get saveRepositoryModel(): any {
        return this._saveRepositoryModel;
    }

    set saveRepositoryModel(saveRepositoryModel: any) {
        this._saveRepositoryModel = saveRepositoryModel;
    }

    get repositoryId(): number | null {
        return this._repositoryId;
    }

    set repositoryId(repositoryId: number | null) {
        this._repositoryId = repositoryId;
    }

    get size(): number {
        return this._size;
    }

    set size(size: number) {
        this._size = size;
    }

    get repository(): Array<{}> {
        return this._repository;
    }

    set repository(repository: Array<{}>) {
        this._repository = repository;
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
