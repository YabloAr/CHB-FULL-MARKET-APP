// export default class customError {
//     static createError(errorObj) {
//         const errorMessage = `${errorObj.name}: ${errorObj.message} (Cause: ${errorObj.cause}, Code: ${errorObj.code})`;
//         const error = new Error(errorMessage);
//         throw error;
//     }
// }

//custom Tonga
export default class CustomError {
    static createError({ name = "Error", cause, message, code = 1 }) {
        const error = new Error(message);
        error.cause = cause;
        error.name = name;
        error.code = code;
        throw error;
    }
}