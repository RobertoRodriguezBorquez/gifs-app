import { GifService } from 'src/services/gif.service';
import { Component, inject, signal } from '@angular/core';
import { GifList } from 'src/app/gifs/components/gifs-side-menu/gif-list/gif-list';
import { Gif } from 'src/interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
  styles: ``, 
})
export default class SearchPage {

  gifService = inject(GifService)
  gifs = signal<Gif[]>([]);  

  onSearch(query: string) {
    this.gifService.searchGifs(query ).subscribe((resp)=>{
     this.gifs.set(resp); 
      
    })
  }
}
