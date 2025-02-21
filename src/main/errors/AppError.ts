
class AppError {
    public readonly message: string;
    public readonly content?: any; // Conteúdo adicional é opcional
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400, content?: any) {
        this.message = message;
        this.statusCode = statusCode;
        this.content = content; // Define o conteúdo, se fornecido
    }
}

export default AppError;
