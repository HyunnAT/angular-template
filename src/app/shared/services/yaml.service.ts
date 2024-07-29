import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as yaml from 'js-yaml';
import { firstValueFrom, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class YamlService {

  constructor(private httpClient: HttpClient) { }

  public async parseYamlFile(path: string): Promise<any> {
    return firstValueFrom(this.httpClient.get(path).pipe(map((res: any) => yaml.load(res))));
  }

}
