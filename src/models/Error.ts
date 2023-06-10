export enum ResponseCode {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    InternalServerError = 500,
    ServiceUnavailable = 503
}

export class ResponseError extends Error {
    statusCode: ResponseCode;
    constructor(
        status: ResponseCode,
        message: string) {
            super(message);
            this.statusCode = status;
        }

}