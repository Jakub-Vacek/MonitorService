export interface IHttpResponse {
    readonly status: number;
    readonly payload: string;
    readonly checked: Date;
}
