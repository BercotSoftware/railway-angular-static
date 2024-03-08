import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <p  class="text-xs-center">© Copyright 2024. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: `
    footer {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 1rem;
      text-align: center;
    }
  `
})
export class FooterComponent {

}
