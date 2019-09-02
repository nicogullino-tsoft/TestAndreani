export default class BtnProps {

    constructor(
        public id: any,
        public btnState: boolean,
        public label: string,
        public onClick: (onEdit?: any) => void,
        public img?: string,
        public className?: string
    ) {

    }

}