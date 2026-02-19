import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from 'src/services/gif.service';
import { GifList } from "src/app/gifs/components/gifs-side-menu/gif-list/gif-list";

@Component({
  selector: ' gifs-history',
  imports: [GifList],
  templateUrl: './gifs-history.html',
})
export default class GifsHistory {
  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query'])),
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
