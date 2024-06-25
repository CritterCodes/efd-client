import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repair-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './repairs-nav.component.html',
  styleUrl: './repairs-nav.component.css'
})
export class RepairsNavComponent implements OnInit {
  repairID: string | null = null;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.repairID = this.route.snapshot.paramMap.get('userID');
    console.log(this.repairID);
  }
}
