//Importamos express y algunos tipos específicos
import express, { Application, Request, Response, NextFunction } from 'express';

//Importamos las rutas
import quotesRouter from './routes/quotes-routes';

//Importamos el middleware de manejo de errores
import { errorMiddleware } from './middlewares/error.middleware';

//Creamos una instancia de app
const app: Application = express();

//Configuración de rutas principales de l app
app.use('/api/quotes', quotesRouter);

//Middleware para manejar rutas que no existen
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint no encontrado,' });
});


app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});