import { Observable } from "rxjs";
import { ApiResponse } from "./api-response.model";
import { inject } from "@angular/core";
import { RestApiService } from "./rest-api.service";

export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';


export class ApiEndpoint {
  public readonly name!: string;
  public readonly url!: string;
  public readonly method!: HttpMethod;
  public responseType: ResponseType = 'json';

  private prefix?: string;
  private queryParams?: Record<string, any>;
  private params?: Record<string, any>;
  private body?: Record<string, any>;

  constructor(pick: Pick<ApiEndpoint, 'name' | 'url' | 'method'>) {
    Object.assign(this, pick);
  }

  public getResponseType(): ResponseType {
    return this.responseType;
  }

  public getBody(): any {
    return this.body;
  }

  public setPrefix(baseUrl: string): this {
    this.prefix = baseUrl;
    return this;
  }

  public setQueryParams(queryParams: Record<string, any>): this {
    this.queryParams = queryParams;
    return this;
  }

  public setParams(params: Record<string, any>): this {
    this.params = params;
    return this;
  }

  public setBody(body: Record<string, any>): this {
    this.body = body;
    return this;
  }

  public getFormattedUrl(): string {
    let formattedUrl = this.combineUrl();
    if (this.params) {
      Object.keys(this.params).forEach((key) => {
        formattedUrl = formattedUrl.replace(`{${key}}`, this.params![key]);
      });
    }

    if (this.queryParams) {
      const queryParams = new URLSearchParams(this.queryParams).toString();
      formattedUrl = `${formattedUrl}?${queryParams}`;
    }

    return formattedUrl;
  }

  public execute<T>(): Observable<ApiResponse<T>> {
    return inject(RestApiService).execute<ApiResponse<T>>(this);
  }

  private combineUrl(): string {
    if (this.prefix === undefined) {
      throw new Error('Prefix URL is not set');
    }

    if (this.url.startsWith('/')) {
      return `${this.prefix}${this.url}`;
    }

    return `${this.prefix}/${this.url}`;
  }
}
