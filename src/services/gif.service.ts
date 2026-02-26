import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GiphyResponse } from 'src/interfaces/giphy.interface';
import { Gif } from 'src/interfaces/gif.interface';
import { GifMapper } from 'src/app/gifs/components/gifs-side-menu/mapper/gif.mapper';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.looadFromLocalStorage();
    this.loadTrendingGifs();
    this.saveLocalStore;
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApikey,
          limit: '15',
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log({ gifs });
      });
  }

  //Search gifs
  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApikey,
          limit: '15',
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        }),
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

  //guardar historial en local storage
  saveLocalStore =effect(()=>{
  const history = this.searchHistory();
  localStorage.setItem('gifs', JSON.stringify(history));
    

  })
  private looadFromLocalStorage(){
    const saved = localStorage.getItem('gifs');
    if(saved ){
      this.searchHistory.set(JSON.parse(saved));
    }
  }
}
