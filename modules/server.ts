
import express,{Application} from 'express';
import cors from 'cors';
import path from 'path';
import userRouter from '../routes/user';
import db from '../config/db';

class Server {
    private app: Application;
    private readonly port: string;
    private endPointsPath = {
        users: '/api/users',
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.dbConnection();
        this.middleware();
        this.routes();
    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error: any) {
            throw new Error(error);
        }
    }
    middleware() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname, '../public')));

    }
    routes() {
        this.app.use(this.endPointsPath.users, userRouter);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }


}
export default Server;