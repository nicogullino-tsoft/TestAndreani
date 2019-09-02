
export default class ModelDefinition {
  private _columns: object[];
  private _modalContent: object;
  private _recordId: string;
  private _newEnabled: boolean;
  private _editEnabled: boolean;
  private _deleteEnabled: boolean;
  private _selectAllEnabled: boolean;
  private _pageable: boolean;
  private _url: string;

  constructor(
    columns: object[],
    modalContent: object,
    recordId: string,
    newEnabled: boolean,
    editEnabled: boolean,
    deleteEnabled: boolean,
    selectAllEnabled: boolean,
    pageable: boolean,
    url: string) {
    this._columns = columns;
    this._modalContent = modalContent;
    this._recordId = recordId;
    this._newEnabled = newEnabled;
    this._editEnabled = editEnabled;
    this._deleteEnabled = deleteEnabled;
    this._selectAllEnabled = selectAllEnabled;
    this._pageable = pageable;
    this._url = url;
  }

  get columns(): object[] {
    return this._columns;
  }
  set columns(newColum: object[]) {
    this._columns = newColum;
  }

  get modalContent(): object {
    return this._modalContent;
  }
  set modalContent(newModalContent: object) {
    this._modalContent = newModalContent;
  }

  get recordId(): string {
    return this._recordId;
  }
  set recordId(newRecordId: string) {
    this._recordId = newRecordId;
  }

  get newEnabled(): boolean {
    return this._newEnabled;
  }
  set newEnabled(newNewEnabled: boolean) {
    this._newEnabled = newNewEnabled;
  }

  get editEnabled(): boolean {
    return this._editEnabled;
  }
  set editEnabled(newEditEnabled: boolean) {
    this._editEnabled = newEditEnabled;
  }

  get deleteEnabled(): boolean {
    return this._deleteEnabled;
  }
  set deleteEnabled(newDeleteEnabled: boolean) {
    this._deleteEnabled = newDeleteEnabled;
  }

  get selectAllEnabled(): boolean {
    return this._selectAllEnabled;
  }
  set selectAllEnabled(newSelectAllEnabled: boolean) {
    this._selectAllEnabled = newSelectAllEnabled;
  }

  get pageable(): boolean {
    return this._pageable;
  }
  set pageable(newPageable: boolean) {
    this._pageable = newPageable;
  }

  get url(): string {
    return this._url;
  }
  set url(newUrl: string) {
    this._url = newUrl;
  }
}
