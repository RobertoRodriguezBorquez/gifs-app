import { Gif } from './../../../../../interfaces/gif.interface';
import { GiphyItems } from 'src/interfaces/giphy.interface';

export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItems): Gif {
    return {
      id: item.id,
      tittle: item.title,
      url: item.images.original.url,
    };
  }

  static mapGiphyItemsToGifArray(items: GiphyItems[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }
}
