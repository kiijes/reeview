export class User {
    constructor(
        public username: String,
        public email: String,
        public password: String,
        public isRegistered: boolean,
        public isAdmin: boolean
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isRegistered = isRegistered;
        this.isAdmin = isAdmin;
    }
}
