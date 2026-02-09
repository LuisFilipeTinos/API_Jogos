import express from 'express';
import dotenv from 'dotenv';
import { database } from './config/db.js';
import jogosRoutes from "./routes/jogosRoutes.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import { createServer } from 'http';
import { WebSocketServer } from 'ws';

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware do Express.js que analisa requisições HTTP com corpos de dados em formato JSON, transformando a string JSON recebida em um objeto JavaScript acessível via req.body
app.use(express.json());

//Definição do meu prefixo de rota:
app.use('/api/jogos', jogosRoutes);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Coleção de Jogos',
            vesion: '0.1'
        },
        servers: [
            {
                url: 'https://api-jogos-wq4x.onrender.com',
            }
        ],
    },
    apis: ['./routes/*.js']
}

const swagger = swaggerJsdoc(options);
app.use('/api/docs', 
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swagger)
)

const server = createServer(app);
const wss = new WebSocketServer({ server });


// Chat simples
wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');

  ws.username = 'Anônimo';

  ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());

    // Mensagem de identificação
    if (msg.type === 'join') {
      ws.username = msg.username;

      // Aviso para todos
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({
              type: 'system',
              text: `${ws.username} entrou no chat`
            })
          );
        }
      });

      return;
    }

    // Mensagem normal de chat
    if (msg.type === 'chat') {
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({
              type: 'chat',
              username: ws.username,
              text: msg.text
            })
          );
        }
      });
    }
  });

  ws.on('close', () => {
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'system',
            text: `${ws.username} saiu do chat`
          })
        );
      }
    });
  });
});


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
    server.listen(port, () => {
        console.log('Servidor rodando na porta: ', port);
    });
});