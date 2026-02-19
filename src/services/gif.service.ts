import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GiphyResponse } from 'src/interfaces/giphy.interface';
import { Gif } from 'src/interfaces/gif.interface';
import { GifMapper } from 'src/app/gifs/components/gifs-side-menu/mapper/gif.mapper';

@Injectable({ providedIn: 'root' })

export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoafing = signal(true);

  constructor() {
    this.loadTrendingGifs();
  }

  

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key:environment.giphyApikey,
          limit: '15',
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoafing.set(false)
        console.log({gifs});
        
        
      });
  }
}
