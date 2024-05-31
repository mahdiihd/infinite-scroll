import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InfiniteScrollComponent} from "./infinite-scroll/infinite-scroll.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfiniteScrollComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'infinite-scroll';
}
