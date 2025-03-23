export type BaseControllerResponse = {
    data: unknown;
    status: number;
};

export interface BaseController {
    success(data: unknown): BaseControllerResponse;
    error(code: number, message: string): BaseControllerResponse;
}
