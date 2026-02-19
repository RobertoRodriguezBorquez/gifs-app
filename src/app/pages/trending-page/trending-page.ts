import { Component, inject, signal } from '@angular/core';
import { GifList } from 'src/app/gifs/components/gifs-side-menu/gif-list/gif-list';
import { GifListItems } from 'src/app/gifs/components/gifs-side-menu/gif-list/gif-list-items/gif-list-items';
import { GifService } from 'src/services/gif.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifList],
  templateUrl: './trending-page.html',
  styles: ``,
})
export default class TrendingPage {
  gifService = inject(GifService);
  
}
