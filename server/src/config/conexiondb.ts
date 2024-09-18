import db from "./db";

export const conexiondb = async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Se conecto a la base de datos');
    } catch (error) {
        console.error('No se conecto a la base de datos por el siguiente error: ', error);
    }
}

