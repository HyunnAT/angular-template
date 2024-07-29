import { Injectable } from '@angular/core';
import { YamlService } from '../services/yaml.service';
import { Api } from './api.model';
import { RestApiEndpoints } from '../constants';
import { ApiEndpoint, HttpMethod } from './api-end-point.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import API from '../../settings/api.json';


const API_SETTINGS_FILE = '../../settings/api.yml';



@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private readonly restApiCache: Map<RestApiEndpoints, Api> = new Map();
  private apiSettings: Api[] = [];

  constructor(private httpClient: HttpClient, private yamlService: YamlService) {
    this.loadApiSettings();
  }

  public getApi(api: RestApiEndpoints): Api {
    if (this.restApiCache.has(api)) {
      return this.restApiCache.get(api)!;
    }

    const apiSettings = this.apiSettings.find(apiModule => apiModule.module === api)!;
    const apiInstance = new Api(apiSettings);
    this.restApiCache.set(api, apiInstance);
    return apiInstance;
  }

  public get<T>(api: ApiEndpoint): Observable<T> {
    return this.httpClient.get<T>(this.createUrl(api));
  }

  public post<T>(api: ApiEndpoint): Observable<T> {
    return this.httpClient.post<T>(this.createUrl(api), api.getBody());
  }

  public put<T>(api: ApiEndpoint): Observable<T> {
    return this.httpClient.put<T>(this.createUrl(api), api.getBody());
  }

  public delete<T>(api: ApiEndpoint): Observable<T> {
    return this.httpClient.delete<T>(this.createUrl(api), { body: api.getBody() });
  }

  public execute<T>(api: ApiEndpoint): Observable<T> {
    switch (api.method) {
      case 'GET':
        return this.get(api);
      case 'POST':
        return this.post(api);
      case 'PUT':
        return this.put(api);
      case 'DELETE':
        return this.delete(api);
      default:
        throw new Error(`Method ${api.method} not supported`);
    }
  }

  public getApiBaseUrl(): string {
    return environment.apiUrl ? environment.apiUrl : window.location.href;
  }

  private async loadApiSettings() {
    this.apiSettings = API.map(api => new Api({ ...api, endpoints: api.endpoints.map(e => new ApiEndpoint({ ...e, method: e.method as HttpMethod })) }));
    console.log('API settings loaded', this.apiSettings);
  }

  private createUrl(api: ApiEndpoint): string {
    return new URL(api.getFormattedUrl(), this.getApiBaseUrl()).toString();
  }
}
