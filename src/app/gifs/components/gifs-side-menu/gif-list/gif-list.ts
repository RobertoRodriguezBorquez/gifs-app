import { Component, computed, input } from '@angular/core';
import { Gif } from 'src/interfaces/gif.interface';

@Component({
  selector: 'app-gif-list',
  templateUrl: './gif-list.html',
})
export class GifList {
  gifs = input.required<Gif[]>();

  gifGroups = computed<Gif[][]>(() => {
    const numGroups = 4;
    const groups: Gif[][] = Array.from({ length: numGroups }, () => []);
    this.gifs().forEach((gif, index) => {
      groups[index % numGroups].push(gif);
    });
    return groups;
  });
}
