import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { NgFor, NgIf, NgClass, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-reviews-carousel',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, CommonModule],
  templateUrl: './reviews-carousel.component.html',
  styleUrl: './reviews-carousel.component.css'
})
export class ReviewsCarouselComponent implements OnInit {
  reviews: any[] = [];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewsService.getGoogleReviews().subscribe(
      (reviews: any[]) => {
        if (reviews) {
          this.reviews = reviews;
        } else {
          console.warn('No reviews found in the response');
        }
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating));
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }
}