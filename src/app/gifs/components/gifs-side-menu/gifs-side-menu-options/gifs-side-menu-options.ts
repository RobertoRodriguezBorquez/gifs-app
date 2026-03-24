import { Component, inject } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/services/gif.service';

interface MenuOption {
  label: string;
  icon: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
})
export class GifsSideMenuOptions {
  gifService = inject(GifService);
  menuOption: MenuOption[] = [
    {
      icon: 'fa-solid fa-arrow-up-right-dots',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: ' Buscar Gifs ',
      route: '/dashboard/search',
    },
  ];

  deleteHistoryItem(query: string): void {
    this.gifService.deleteHistoryItem(query);
  }
}
