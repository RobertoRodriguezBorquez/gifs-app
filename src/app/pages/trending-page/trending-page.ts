import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from 'src/app/gifs/components/gifs-side-menu/gif-list/gif-list';
import { GifListItems } from 'src/app/gifs/components/gifs-side-menu/gif-list/gif-list-items/gif-list-items';
import { GifService } from 'src/services/gif.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifList],
  templateUrl: './trending-page.html',
  styles: ``,
})
export default class TrendingPage {
  gifService = inject(GifService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
   if (!scrollDiv) return; 

   const scrollTop = scrollDiv.scrollTop;
   const clientHeight = scrollDiv.clientHeight;
   const scrollHeight = scrollDiv.scrollHeight;
    
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    if (isAtBottom) {
      this.gifService.loadTrendingGifs();      
    }

  }
  
}
