import Database from "./config";

const initDb = {
    async init(){
        const db = await Database();

        await db.exec(`CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            password TEXT,
            whatsapp INT
        )`);
        
        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            user_id INT,
            area TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`)

        

        await db.close();
    }
}

initDb.init();