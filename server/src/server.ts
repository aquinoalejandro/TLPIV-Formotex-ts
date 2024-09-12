import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { conexiondb } from './config/conexiondb';
import authRoutes from './routes/auth.routes';


class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.dbconexion();
        this.middlewares();
        this.routes();
        
    }

    async dbconexion(): Promise<void> {
        await conexiondb();
    
    }
    


    middlewares(): void {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use(authRoutes);

    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }




}


export default Server;
