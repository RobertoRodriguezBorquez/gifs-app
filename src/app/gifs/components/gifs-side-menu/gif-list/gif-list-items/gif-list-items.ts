import { Component, input } from '@angular/core';


@Component({
  selector: 'app-gif-list-items',
  imports: [],
  templateUrl: './gif-list-items.html',
  styles: ``,
})
export class GifListItems {
   imageUrl = input.required<string>();
}

