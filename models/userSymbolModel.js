class UserSymbol {
    constructor (db) {
        this.db = db;
    };

    async add ({userId, symbol}) {
        return this.db.execute(`
            insert into users_symbols (user_id, symbol)
            values (?, ?)
        `,[
            userId,
            symbol,
        ]);
    };
    
    async findByUserId ({userId}) {
        const result = await this.db.execute(`
            select * from users_symbols where user_id = ?
        `,[
            userId,
        ]);    
        return result;
    };
    
}


module.exports = UserSymbol;
