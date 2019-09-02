export default class ContentModalRepositoriesState {
  private _description: string;
  private _endpoint: string;
  private _name: string;
  private _credentialId: number;
  private _projectId: number;
  private _protocolId: number;
  private _repositoryId: number;
  private _providerId: number;
  private _status: boolean;
  private _error: any;
  private _positive: boolean | null;
  private _credentials: Array<{}>;
  private _projects: Array<{}>;
  private _providers: Array<{}>;
  private _credentialIdMap: Map<number, string>;
  private _providerIdMap: Map<number, string>;
  private _protocolIdMap: Map<number, string>;
  private _projectIdMap: Map<number, string>;
  private _enabled: boolean | null;
  private _id: number | null;
  private _protocolIds: [];
  private _projectsDataList: Array<{}>;
  private _valueCron: string;
  private _protocols?: string | number | boolean | Array<string | number | boolean>;
  constructor(
    credentialId: number,
    description: string,
    endpoint: string,
    name: string,
    projectId: number,
    protocolId: number,
    protocolIds: [],
    status: boolean,
    error: any,
    positive: boolean | null,
    repositoryId: number,
    credentialIdMap: Map<number, string>,
    credentials: Array<{}>,
    providerIdMap: Map<number, string>,
    protocolIdMap: Map<number, string>,
    providerId: number,
    providers: Array<{}>,
    id: number | null,
    enabled: boolean | null,
    projectIdMap: Map<number, string>,
    projects: Array<{}>,
    projectsDataList: Array<{}>,
    valueCron: string,
    protocols?: string | number | boolean | Array<string | number | boolean>,
  ) {
    this._credentialId = credentialId;
    this._description = description;
    this._endpoint = endpoint;
    this._name = name;
    this._projectId = projectId;
    this._protocolId = protocolId;
    this._protocolIds = protocolIds;
    this._status = status;
    this._error = error;
    this._positive = positive;
    this._repositoryId = repositoryId;
    this._credentialIdMap = credentialIdMap;
    this._credentials = credentials;
    this._providerIdMap = providerIdMap;
    this._protocolIdMap = providerIdMap;
    this._providerId = providerId;
    this._providers = providers;
    this._id = id;
    this._enabled = enabled;
    this._projectIdMap = projectIdMap;
    this._projects = projects;
    this._projectsDataList = projectsDataList;
    this._valueCron = valueCron;
    this._protocols = protocols;
  }
  get credentialId(): number {
    return this._credentialId;
  }
  set credentialId(testEnabled: number) {
    this._credentialId = testEnabled;
  }
  get credentials(): Array<{}> {
    return this._credentials;
  }

  set credentials(credentials: Array<{}>) {
    this._credentials = credentials;
  }
  get description(): string {
    return this._description;
  }
  set description(testEnabled: string) {
    this._description = testEnabled;
  }

  get endpoint(): string {
    return this._endpoint;
  }
  set endpoint(endopoint: string) {
    this._endpoint = endopoint;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get projectId(): number {
    return this._projectId;
  }
  set projectId(projectId: number) {
    this._projectId = projectId;
  }

  get protocolId(): number {
    return this._protocolId;
  }
  set protocolId(protocolId: number) {
    this._protocolId = protocolId;
  }

  get status(): boolean {
    return this._status;
  }
  set status(status: boolean) {
    this._status = status;
  }

  get error(): any {
    return this._error;
  }
  set error(error: any) {
    this._error = error;
  }

  get repositoryId(): number {
    return this._repositoryId;
  }
  set repositoryId(repositoryId: number) {
    this._repositoryId = repositoryId;
  }

  get credentialIdMap(): Map<number, string> {
    return this._credentialIdMap;
  }
  set credentialIdMap(credentialIdMap: Map<number, string>) {
    this._credentialIdMap = credentialIdMap;
  }
  get providerIdMap(): Map<number, string> {
    return this._providerIdMap;
  }
  set providerIdMap(providerIdMap: Map<number, string>) {
    this._providerIdMap = providerIdMap;
  }

  get providerId(): number {
    return this._providerId;
  }
  set providerId(providerId: number) {
    this._providerId = providerId;
  }
  get providers(): Array<{}> {
    return this._providers;
  }

  set providers(providers: Array<{}>) {
    this._providers = providers;
  }
  get id(): number | null {
    return this._id;
  }

  set id(id: number | null) {
    this._id = id;
  }
  get enabled(): boolean | null {
    return this._enabled;
  }

  set enabled(enabled: boolean | null) {
    this._enabled = enabled;
  }

  get projectIdMap(): Map<number, string> {
    return this._projectIdMap;
  }
  set projectIdMap(projectIdMap: Map<number, string>) {
    this._projectIdMap = projectIdMap;
  }
  get protocolIdMap(): Map<number, string> {
    return this._protocolIdMap;
}

set protocolIdMap(protocolIdMap: Map<number, string>) {
    this._protocolIdMap = protocolIdMap;
}
  get projects(): Array<{}> {
    return this._projects;
  }
  set projects(projects: Array<{}>) {
    this._projects = projects;
  }
  get projectsDataList(): Array<{}> {
    return this._projectsDataList;
  }
  set projectsDataList(projectsDataList: Array<{}>) {
    this._projectsDataList = projectsDataList;
  }
  get protocols(): string | number | boolean | Array<string | number | boolean> | undefined {
    return this._protocols;
  }

  set protocols(protocols: string | number | boolean | Array<string | number | boolean> | undefined) {
    this._protocols = protocols;
  }
  get protocolIds(): [] {
    return this._protocolIds;
}

set protocolIds(protocolIds: []) {
    this._protocolIds = protocolIds;
}
get positive(): boolean | null {
  return this._positive;
}

set positive(positive: boolean | null) {
  this._positive = positive;
}

get valueCron(): string {
  return this._valueCron;
}

set valueCron(valueCron: string) {
  this._valueCron = valueCron;
}
}