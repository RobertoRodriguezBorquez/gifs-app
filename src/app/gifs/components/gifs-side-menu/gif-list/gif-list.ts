import { Component, input } from '@angular/core';
import { GifListItems } from "./gif-list-items/gif-list-items";
import { Gif } from 'src/interfaces/gif.interface';

@Component({
  selector: 'app-gif-list',
  imports: [GifListItems],
  templateUrl: './gif-list.html',
  styles: ``,
})
export class GifList { 
    gifs = input.required<Gif[]>();

}
