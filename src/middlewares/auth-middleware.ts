//Importo los tipos específicos de express
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];

    //Verifica si existe el token
    if (!token || token !== 'Bearer my-secret-token') {
        res.status(401).json({ error: 'No autorizado' });
        return //Finaliza la ejecución
    };

    //Si pasa la verificación, continúa con el siguiente middleware
    next();

};