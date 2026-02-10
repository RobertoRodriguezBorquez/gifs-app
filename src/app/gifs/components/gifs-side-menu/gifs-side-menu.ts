import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsSideMenuHeader } from './gifs-side-menu-header/gifs-side-menu-header';
import { GifsSideMenuOptions } from './gifs-side-menu-options/gifs-side-menu-options';
import { environment } from '@environments/environment.development';


@Component({
  selector: 'app-gifs-side-menu',
  imports: [GifsSideMenuHeader, GifsSideMenuOptions],
  templateUrl: './gifs-side-menu.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenu {
  envs = environment 
}
