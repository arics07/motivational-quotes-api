//Importamos el módulo Router //2:52:15
import { Router } from "express";

//Importamos las funciones del controlador que son las que gestionan las operaciones
import {
    getAllQuotes,
    getQuoteById,
    createQuote,
    updateQuote,
    deleteQuote
} from '../controllers/quotes-controllers';

//Importamos el middleware que controla los datos de las frases
import { validateQuote } from "../middlewares/validate-middleware";

//Creamos una instancia de Router
const router: Router = Router();

//RUTAS

//GET para obtener todas las frases
router.get('/', getAllQuotes);

//GET para obtener una frase por ID
router.get('/:id', getQuoteById);

//POST para crear una nueva frase
router.post('/', validateQuote, createQuote);

//PATCH para actualizar una frase existente
router.patch('/:id', validateQuote, updateQuote);

//DELETE para eliminar una frase
router.delete('/:id', deleteQuote);


//Exportamos el enrutador
export default router;