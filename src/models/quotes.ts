//Importamos módulos para trabajar con sistemas de archivos y rutas
import fs from 'fs'; //nativo
import path from 'path'; //nativo


//Definimos la ruta del archivo JSON que usamos de base de datos
const filePath = path.join(__dirname, '../database/quotes.json'); //ruta hacia la base de datos


//Interfaz que representa la estructura de un afrase
interface Quote {
    id: string,
    text: string,
    author: string
};


//Encapsulamos todas las operaciones con frases en una Clase
export class QuotesModel {

    //Obtener y leer todas las frases en el archivo
    static getAllQuotes(): Quote[] {
        //Obtener todos los datos desde nuestra BD
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data.quotes; //retorna solo la parte de quotes, no de info
    };

    //Obtener una frase según id
    static getQuoteById(id: string): Quote | undefined {
        const data = this.getAllQuotes(); //Obtengo todas las frases en un array
        //Buscamos la frase de ese id buscado con el método .find
        return data.find((quote) => quote.id === id);
    };

    //Crear una frase
    static addQuote(newQuote: Quote): Quote {
        //Parseamos el archivo JSON
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        //Creo un nuevo id basado en la longitud del array
        const newId = (data.quotes.length + 1).toString();

        //Creo la nueva frase
        //Operador spread {...} se usa para combinar objetos
        const quote = { ...newQuote, id: newId};
        //La agrego a la BD
        data.quotes.push(quote);
        //Incremento el contador de frases (total)
        data.info.total += 1;

        //Guardo los datos en formato JSON
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return quote;
    };

    //Actualizar una frase
    //Partial<Quote>: no va a entrar toda la información de la frase (autor, etc) sino una parte del objeto
    static updateQuote(id: string, updatedData: Partial<Quote>): Quote | null {
        //Leemos el JSON y buscamos por ID
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = data.quotes.findIndex((quote: Quote) => quote.id === id);

        //Si no encuentra el id
        if (index === -1) return null;
        //Si encuentra el id, actualiza la frase
        data.quotes[index] = {...data.quotes[index], ...updatedData}; //se combina la frase con la frase actualizada
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return data.quotes[index]; //retorna la frase actualizada
    };

    //Eliminar una fraase
    static deleteQuote(id: string): boolean {
        //Lee el JSON y busca por id
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = data.quotes.findIndex((quote: Quote) => quote.id === id);

        //Si no encuentra el id, devuelve false
        if (index === -1) return false;

        //Si encuentra el id, elimina la frase y decrementa el contador (total)
        data.quotes.splice(index, 1);
        data.info.total -= 1;

        //Guardamos los cambios
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;

    };
    
};