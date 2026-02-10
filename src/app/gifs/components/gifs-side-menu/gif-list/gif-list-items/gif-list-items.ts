import { Component, input } from '@angular/core';
import TrendingPage from 'src/app/pages/trending-page/trending-page';

@Component({
  selector: 'app-gif-list-items',
  imports: [],
  templateUrl: './gif-list-items.html',
  styles: ``,
})
export class GifListItems {
   imageUrl = input.required<string>();
}

