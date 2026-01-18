import express from 'express';
import dotenv from 'dotenv';
import { database } from './config/db.js';
import jogosRoutes from "./routes/jogosRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware do Express.js que analisa requisições HTTP com corpos de dados em formato JSON, transformando a string JSON recebida em um objeto JavaScript acessível via req.body
app.use(express.json());

//Definição do meu prefixo de rota:
app.use("/api/jogos", jogosRoutes);

//Teste de conexão com o banco:
async function testDbConnection() {
    try {
        const { data, error } = await database.
            from('jogos')
            .select('id, nome')
            .eq('id', 1);

        console.log('Conexão estabelecida!');
        console.log(data);
        console.log(error);
    } catch (error) {
        console.log('Conexão recusada ou inexistente!');
    }
}

testDbConnection().then(() => {
    app.listen(port, () => {
        console.log('Servidor rodando na porta: ', port);
    });
});