//Importamos los tipos para definir las funciones de los controladores
import { Request, Response } from "express";

//Importamos el modelo de datos que contiene la lógica
import { QuotesModel } from "../models/quotes";

//Controlador para obtener las frases
export const getAllQuotes = (req: Request, res: Response): void => {
    //Llamamos al método
    const quotes = QuotesModel.getAllQuotes();
    //Enviamos las frases como rta en formato JSON
    res.json(quotes);
};

//2:27:17