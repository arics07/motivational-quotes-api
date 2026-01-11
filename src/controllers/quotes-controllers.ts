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


//Controlador para obtener una frase por id
export const getQuoteById = (req: Request, res: Response): void => {
    //Extraigo el parámetro id del endpoint
    const { id } = req.params;
    //Llamo al modelo
    const quote = QuotesModel.getQuoteById(id);

    //Si no lo encuentra va a devolver error
    if (!quote) {
        res.status(404).json({ error: 'Frase no encontrada.' });
    };

    //Si la encuentra, envía la rta
    res.json(quote);

};


//Controlador para crear una nueva frase
export const createQuote = (req: Request, res: Response): void => {
    //Llamo al modelo
    const newQuote = QuotesModel.addQuote(req.body);
    //Devuelvo la frase recién creada
    res.status(201).json(newQuote);
};


//Controlador para actualizar una frase
export const updateQuote = (req: Request, res: Response): void => {
    const { id } = req.params; //extraemos el paramentro id del endpoint
    //Llamamos al método del modelo
    const updateQuote = QuotesModel.updateQuote(id, req.body); 

    //Si no lo encuentra, devuelve error
    if (!updateQuote) {
        res.status(404).json({ error: 'Frase no encontrada '});
        return
    };

    //Devolvemos la frase
    res.json(updateQuote);

};


//Controlador para eliminar una frase
export const deleteQuote = (req: Request, res: Response): void => {
    const { id } = req.params; //extraemos el paramentro id del endpoint

    //Llamamos al método del modelo
    const isDeleted = QuotesModel.deleteQuote(id);

    //Verificación
    if (!isDeleted) {
        res.status(404).json({ error: 'Frase no encontrada' });
        return
    }; 

    //Si es eliminada
    res.status(204).send;

};