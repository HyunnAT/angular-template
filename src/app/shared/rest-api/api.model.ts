import { DEFAULT_DELETE_ENDPOINT, DEFAULT_GET_ENDPOINT, DEFAULT_CREATE_ENDPOINT, DEFAULT_UPDATE_ENDPOINT } from "../constants";
import { ApiEndpoint } from "./api-end-point.model";

export class Api {
  public readonly module!: string;
  public readonly prefix!: string;
  public type?: string;
  public endpoints: ApiEndpoint[] = [];

  constructor(picks: Pick<Api, 'module' | 'prefix' | 'endpoints'>) {
    this.module = picks.module;
    this.prefix = picks.prefix;
    this.endpoints = picks.endpoints;
    this.initDefaultEndpoints();
  }

  public getEndPoint(endpointName: string): ApiEndpoint {
    const endpoint = this.endpoints.find((e) => compareStringIgnoreCase(e.name, endpointName));
    if (!endpoint) {
      throw new Error(`Endpoint ${endpointName} not found`);
    }

    endpoint.setPrefix(this.prefix);
    return endpoint;
  }

  private initDefaultEndpoints() {
    if (!this.type) {
      return;
    }

    this.type = this.type.toUpperCase();
    if (this.type.includes('C')) {
      this.endpoints.push(new ApiEndpoint(DEFAULT_CREATE_ENDPOINT));
    }

    if (this.type.includes('R')) {
      this.endpoints.push(new ApiEndpoint(DEFAULT_GET_ENDPOINT));
    }

    if (this.type.includes('U')) {
      this.endpoints.push(new ApiEndpoint(DEFAULT_UPDATE_ENDPOINT));
    }

    if (this.type.includes('D')) {
      this.endpoints.push(new ApiEndpoint(DEFAULT_DELETE_ENDPOINT));
    }
  }
}

function compareStringIgnoreCase(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}
