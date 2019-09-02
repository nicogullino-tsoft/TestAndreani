export default class AbmRowProps {

  constructor(
    public modelDefinition: any,
    public data: any,
    public isCheckAll: boolean,
    public checksSelected: any,
    public valueOfCheck: boolean,
    public handleCheckRow: (value: boolean, id: number) => void,
    public handleSingleState: (dataRow: boolean, previousSibling: any) => void,
    public actionEdit: (id: number, view: string | undefined) => void,
    // public name: string,
    // public nextProps: any,
    // public onChange: () => void,
    // public handleChecked: () => void,
    // public changeStatusRecord: () => void,
    // public componentWillReceiveProps: (nextProps?: any) => void,
  ) {

  }

}