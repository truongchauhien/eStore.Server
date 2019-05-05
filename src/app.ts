import express from 'express';
import mongoose from 'mongoose';
import config from './utils/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import productRoutes from './routes/productRoutes';

async function main() {
    let mongoDbUri = `mongodb://${config.get('database.host')}:${config.get('database.port')}/${config.get('database.name')}`;
    mongoose.Promise = global.Promise;
    try {
        await mongoose.connect(mongoDbUri, { useNewUrlParser: true });
    } catch {
        console.error('Could not connect to MongoDB Server!');
        return;
    }

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(morgan('combined'));

    app.use('/auth', authRoutes);
    app.use('/product', productRoutes);

    const appPort = config.get('port');
    app.listen(appPort, () => console.log(`App listening on port ${appPort}`));
}

main();
