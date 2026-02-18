import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GiphyResponse } from 'src/interfaces/giphy.interface';

@Injectable({ providedIn: 'root' })
export class GifService {
  constructor() {}

  private http = inject(HttpClient);

  loadTrendingGifs() {
    this.http.get<GiphyResponse>('${enviroment.giphyUrl }/gifs/trending', {
      params: {
        api_key: environment.giphyUrl,
        limit: '15',
      },
    });
  }
}
