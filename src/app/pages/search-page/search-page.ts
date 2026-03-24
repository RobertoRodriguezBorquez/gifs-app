import { GifService } from 'src/services/gif.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifList } from 'src/app/gifs/components/gifs-side-menu/gif-list/gif-list';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
  styles: ``,
})
export default class SearchPage implements AfterViewInit {
  gifService = inject(GifService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('resultsDiv');

  ngAfterViewInit(): void {
    // Initialize scroll position
    this.resetScroll();
  }

  private resetScroll(): void {
    setTimeout(() => {
      const scrollDiv = this.scrollDivRef()?.nativeElement;
      if (scrollDiv) scrollDiv.scrollTop = 0;
    });
  }

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe(() => {
      this.resetScroll();
    });
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 200 >= scrollHeight;

    if (isAtBottom) {
      this.gifService.loadMoreSearchGifs();
    }
  }
}
