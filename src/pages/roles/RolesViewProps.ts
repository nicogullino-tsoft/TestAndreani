export default class RolesViewProps {

    constructor(
        public role: Array<{}>,
        public getRoles: () => Promise<[]>,
        public getRolesById: (id: number | null) => Promise<void>,
        public postRoles: (data: object) => Promise<void>,
        public putRoles: (id: number, data: object) => Promise<void>,
        public putRolesStatus: (data: object) => Promise<void>,
        public getAllPermissions: () => Promise<[]>
    ) {

    }
}