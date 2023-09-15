export default class customError {
    static createError(errorObj) {
        const errorMessage = `${errorObj.name}: ${errorObj.message} (Cause: ${errorObj.cause}, Code: ${errorObj.code})`;
        const error = new Error(errorMessage);
        throw error;
    }
}