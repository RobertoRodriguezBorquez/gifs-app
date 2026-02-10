import { Component, input } from '@angular/core';
import { GifListItems } from "./gif-list-items/gif-list-items";

@Component({
  selector: 'app-gif-list',
  imports: [GifListItems],
  templateUrl: './gif-list.html',
  styles: ``,
})
export class GifList { 
    gifs = input.required<string[]>();

}
