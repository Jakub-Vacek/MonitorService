import axios, { AxiosError, AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { IHttpResponse } from './http-response.interface';
@injectable()
export class HttpService {
    public async getResponse(url: string): Promise<IHttpResponse> {
        try {
            const response: AxiosResponse<object> = await axios.get(url);
            return {status: response.status, payload: JSON.stringify(response.data), checked: new Date()};
        } catch (e) {
            if((e as AxiosError).isAxiosError) {
                if ((e as AxiosError).response) {
                    return {status: (e as AxiosError).response.status, payload: JSON.stringify((e as AxiosError).response.data), checked: new Date()};
                }
                return {status: 500, payload: JSON.stringify({code: (e as AxiosError).code, message: (e as AxiosError).message}), checked: new Date()};
            }
        }
    }
}
