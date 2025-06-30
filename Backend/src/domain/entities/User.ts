export class User {
    constructor(
        public id:string | null,
        public name:string,
        public email:string,
        public role:'user' | 'admin',
        public password:string,
        public profile:string,
    ){}
}