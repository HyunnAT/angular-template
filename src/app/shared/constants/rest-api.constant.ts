import { ApiEndpoint } from "../rest-api/api-end-point.model"


export enum RestApiEndpoints {
  Users = 'users',
}


export const DEFAULT_CREATE_ENDPOINT = new ApiEndpoint({
  name: 'Create',
  url: 'save',
  method: 'POST'
});

export const DEFAULT_GET_ENDPOINT = new ApiEndpoint({
  name: 'Get',
  url: 'get?{id}',
  method: 'GET',
});

export const DEFAULT_UPDATE_ENDPOINT = new ApiEndpoint({
  name: 'Update',
  url: 'save',
  method: 'POST'
});

export const DEFAULT_DELETE_ENDPOINT = new ApiEndpoint({
  name: 'Delete',
  url: 'delete',
  method: 'PUT'
});
