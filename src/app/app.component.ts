import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestApiEndpoints } from './shared/constants';
import { RestApiService } from './shared/rest-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [RestApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'angular-template';

  constructor(private restApiService: RestApiService) {
    const url = this.restApiService
      .getApi(RestApiEndpoints.Users)
      .getEndPoint('getUsers')
      .setParams({ id: '1' })
      .execute()
      .subscribe((data) => console.log(data));

    console.log(url);
  }
}
