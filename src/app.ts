import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';
import { config } from 'dotenv'
config();

const app = express()

app.use(bodyParser.json());

const mongoDBUrl = process.env.DATABASE_URL as string;
mongoose
    .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions)
    .then(() => {
        console.log('Conexão com o MongoDB estabelecida com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });
// Rotas públicas
app.use('/api/public', publicRoutes);

// Rotas privadas (usando o middleware de autenticação)
app.use('/api/private', privateRoutes);

// Porta em que o servidor irá escutar
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor Express está ouvindo na porta ${port}`);
});
export default app;