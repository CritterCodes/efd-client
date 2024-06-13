import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ReviewsCarouselComponent } from '../reviews-carousel/reviews-carousel.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, ReviewsCarouselComponent, NavComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {}
