import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//comando para servir arquivos estaticos
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(process.env.PORT || 3001, ()=> {
    console.log('> Server run at http://localhost:3001');
});