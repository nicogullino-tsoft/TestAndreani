export default class ContentModalUsersProps {

    constructor(
        public userId: number | null,
        public readOnly: boolean,
        public disableBtn: (disableBtn: boolean) => void,
        public receiveAction: (saveRole: () => void) => void,
        public getRecordById: (id: number | null) => Promise<void>,
        public postUsers: (datos: object) => void,
        public putUsers: (id: number, datos: object) => void,
        public getAllPermissions: () => Promise<[]>,
        public getAllRoles: () => Promise<[]>
    ) {

    }
}