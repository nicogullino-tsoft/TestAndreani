export default class AbmRowState {
  private _dataRow: any;
  private _valueCheck: boolean;
  constructor(
    dataRow: any,
    valueCheck: boolean
  ) {
    this._dataRow = dataRow;
    this._valueCheck = valueCheck;
  }
  get dataRow(): any {
    return this._dataRow;
  }

  set dataRow(dataRow: any) {
    this._dataRow = dataRow;
  }

  get valueCheck(): boolean {
    return this._valueCheck;
  }

  set valueCheck(valueCheck: boolean) {
    this._valueCheck = valueCheck;
  }
}