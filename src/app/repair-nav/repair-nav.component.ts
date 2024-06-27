import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repair-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './repair-nav.component.html',
  styleUrl: './repair-nav.component.css'
})
export class RepairNavComponent implements OnInit {
  repairID: string | null = null;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRepairID;
  }

  getRepairID(): void {
    this.route.parent?.paramMap.subscribe((paramMap) => {
      this.repairID = paramMap.get('repairID');
    });
  }
}
