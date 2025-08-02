import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HighlightDemo } from './components/highlight-demo/highlight-demo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HighlightDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
