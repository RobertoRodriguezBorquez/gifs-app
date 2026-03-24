import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../environments/environment';
import type { GiphyResponse } from 'src/interfaces/giphy.interface';
import { Gif } from 'src/interfaces/gif.interface';
import { GifMapper } from 'src/app/gifs/components/gifs-side-menu/mapper/gif.mapper';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; //Record<string, gifs[]>
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
};

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  searchGifsResults = signal<Gif[]>([]);
  searchGifsLoading = signal(false);
  private searchPage = signal(0);
  private currentSearchQuery = signal<string>('');

  trendingGifGroup = computed<Gif[][]>(() => {
    const numGroups = 4;
    const groups: Gif[][] = Array.from({ length: numGroups }, () => []);
    this.trendingGifs().forEach((gif, index) => {
      groups[index % numGroups].push(gif);
    });
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 40,
          offset: this.trendingPage() * 40,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingPage.update((page) => page + 1);

        this.trendingGifsLoading.set(false);
      });
  }

  loadMoreSearchGifs() {
    const query = this.currentSearchQuery();
    if (!query || this.searchGifsLoading()) return;

    this.searchGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 40,
          offset: this.searchPage() * 40,
          q: query,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.searchGifsResults.update((currentGifs) => [
          ...currentGifs,
          ...gifs,
        ]);
        this.searchPage.update((page) => page + 1);

        this.searchGifsLoading.set(false);
      });
  }

  //Search gifs
  searchGifs(query: string): Observable<Gif[]> {
    // Reset pagination for new search
    this.searchPage.set(0);
    this.searchGifsResults.set([]);
    this.currentSearchQuery.set(query);

    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApikey,
          limit: '40',
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        tap((items: Gif[]) => {
          this.searchGifsResults.set(items);
          this.searchPage.update((page) => page + 1);
          // Historial
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        }),
        map(() => this.searchGifsResults()),
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

  //   //guardar historial en local storage
  //   saveLocalStore = effect(() => {
  //     const history = this.searchHistory();
  //     localStorage.setItem('gifs', JSON.stringify(history));
  //   });
  //   private looadFromLocalStorage() {
  //     const saved = localStorage.getItem('gifs');
  //     if (saved) {
  //       this.searchHistory.set(JSON.parse(saved));
  //     }
  //   }
}
