import { IHttpResponse } from '../http-response.interface';

export class HttpServiceStub {
    public async getResponse(url: string): Promise<IHttpResponse> {
        return {status: 200, payload: JSON.stringify({test: url}), checked: new Date()};
    }
}
