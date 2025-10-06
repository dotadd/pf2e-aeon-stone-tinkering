export abstract class Component {
    constructor (
        public level: number,
        public name: string,
        public text: string,
        public price: number,
    ) {}
}