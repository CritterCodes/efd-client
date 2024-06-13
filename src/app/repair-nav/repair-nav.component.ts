import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-repair-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './repair-nav.component.html',
  styleUrl: './repair-nav.component.css'
})
export class RepairNavComponent {

}
