export default class ContentModalProjectsState {
    private _id: number | null;
    private _name: string;
    private _description: string;
    private _repositoryDataList: Array<{}>;
    private _repositoryData: Map<number, string>;
    private _enabled: boolean | null;
    private _error: string | undefined;
    private _positive: boolean | null;
    private _credentialIdMap: Map<number, string>;
    private _providerIdMap: Map<number, string>;
    private _protocolIdMap: Map<number, string>;
    private _providerId: number;
    private _repositoryIds: number[];
    private _credentials: Array<{}>;
    private _providers: Array<{}>;
    private _credentialId: number;
    private _protocolId: number;
    private _protocolIds: [];
    private _repositoriesValues: string[];
    private _valueCron: string;
    constructor(
        id: number | null,
        name: string,
        description: string,
        repositoryDataList: Array<{}>,
        repositoryData: Map<number, string>,
        enabled: boolean | null,
        error: string | undefined,
        positive: boolean | null,
        credentialIdMap: Map<number, string>,
        providerIdMap: Map<number, string>,
        protocolIdMap: Map<number, string>,
        providerId: number,
        repositoryIds: number[],
        credentials: Array<{}>,
        providers: Array<{}>,
        credentialId: number,
        protocolId: number,
        protocolIds: [],
        repositoriesValues: string[],
        valueCron: string
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._repositoryDataList = repositoryDataList;
        this._repositoryData = repositoryData;
        this._enabled = enabled;
        this._error = error;
        this._positive = positive;
        this._credentialIdMap = credentialIdMap;
        this._providerIdMap = providerIdMap;
        this._protocolIdMap = providerIdMap;
        this._providerId = providerId;
        this._repositoryIds = repositoryIds;
        this._credentials = credentials;
        this._providers = providers;
        this._credentialId = credentialId;
        this._protocolId = protocolId;
        this._protocolIds = protocolIds;
        this._repositoriesValues = repositoriesValues;
        this._valueCron = valueCron;
    }

    get id(): number | null {
        return this._id;
    }

    set id(id: number | null) {
        this._id = id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get repositoryDataList(): Array<{}> {
        return this._repositoryDataList;
    }

    set repositoryDataList(repositoryDataList: Array<{}>) {
        this._repositoryDataList = repositoryDataList;
    }

    get repositoryData(): Map<number, string> {
        return this._repositoryData;
    }

    set repositoryData(repositoryData: Map<number, string>) {
        this._repositoryData = repositoryData;
    }

    get enabled(): boolean | null {
        return this._enabled;
    }

    set enabled(enabled: boolean | null) {
        this._enabled = enabled;
    }

    get error(): string | undefined {
        return this._error;
    }

    set error(error: string | undefined) {
        this._error = error;
    }

    get positive(): boolean | null {
        return this._positive;
    }

    set positive(positive: boolean | null) {
        this._positive = positive;
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

    get protocolIdMap(): Map<number, string> {
        return this._protocolIdMap;
    }

    set protocolIdMap(protocolIdMap: Map<number, string>) {
        this._protocolIdMap = protocolIdMap;
    }

    get providerId(): number {
        return this._providerId;
    }

    set providerId(providerId: number) {
        this._providerId = providerId;
    }

    get repositoryIds(): number[] {
        return this._repositoryIds;
    }

    set repositoryIds(repositoryIds: number[]) {
        this._repositoryIds = repositoryIds;
    }

    get credentials(): Array<{}> {
        return this._credentials;
    }

    set credentials(credentials: Array<{}>) {
        this._credentials = credentials;
    }

    get providers(): Array<{}> {
        return this._providers;
    }

    set providers(providers: Array<{}>) {
        this._providers = providers;
    }

    get credentialId(): number {
        return this._credentialId;
    }

    set credentialId(credentialId: number) {
        this._credentialId = credentialId;
    }

    get protocolId(): number {
        return this._protocolId;
    }

    set protocolId(protocolId: number) {
        this._protocolId = protocolId;
    }

    get protocolIds(): [] {
        return this._protocolIds;
    }

    set protocolIds(protocolIds: []) {
        this._protocolIds = protocolIds;
    }

    get repositoriesValues(): string[] {
        return this._repositoriesValues;
    }

    set repositoriesValues(repositoriesValues: string[]) {
        this._repositoriesValues = repositoriesValues;
    }

    set valueCron(valueCron: string) {
        this._valueCron = valueCron;
    }

    get valueCron(): string {
        return this._valueCron;
    }
}