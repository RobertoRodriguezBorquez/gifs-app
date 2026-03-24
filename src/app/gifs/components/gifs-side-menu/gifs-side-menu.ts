import { Component } from '@angular/core';
import { GifsSideMenuHeader } from './gifs-side-menu-header/gifs-side-menu-header';
import { GifsSideMenuOptions } from './gifs-side-menu-options/gifs-side-menu-options';
import { Footer } from '../footer/footer';



@Component({
  selector: 'app-gifs-side-menu',
  imports: [GifsSideMenuHeader, GifsSideMenuOptions,Footer],
  templateUrl: './gifs-side-menu.html',

  
})
export class GifsSideMenu {
 
}
