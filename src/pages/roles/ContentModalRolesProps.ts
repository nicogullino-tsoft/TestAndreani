export default class ContentModalRolesProps {

    constructor(
        public roleId: number | null,
        public readOnly: boolean,
        public disableBtn: (disableBtn: boolean) => void,
        public receiveAction: (saveRole: () => void) => void,
        public getRecordById: (id: number | null) => Promise<void>,
        public postRoles: (datos: object) => void,
        public putRoles: (id: number, datos: object) => void,
        public getAllPermissions: () => Promise<[]>
    ) {

    }
}