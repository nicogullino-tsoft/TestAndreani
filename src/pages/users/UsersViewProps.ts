export default class UsersViewProps {

    constructor(
        public user: Array<{}>,
        public getUsers: (page: number, size: number) => Promise<[]>,
        public getUsersById: (id: number | null) => Promise<void>,
        public postUsers: (data: object) => Promise<void>,
        public putUsers: (id: number, data: object) => Promise<void>,
        public putUsersStatus: (data: object) => Promise<void>,
        public getAllRoles: () => Promise<[]>,
        public getAllPermissions: () => Promise<[]>,
        public getCountUsers: () => Promise<number>
    ) {

    }
}