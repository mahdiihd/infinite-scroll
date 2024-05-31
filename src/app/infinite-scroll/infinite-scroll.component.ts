// post-list.component.ts

import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { PostService } from './post.service';
import {DOCUMENT, NgClass, NgForOf} from "@angular/common";
import {PostModel} from "../shared/models/post.model";

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  providers:[PostService],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss'
})

export class InfiniteScrollComponent implements OnInit, AfterViewInit {
  // QueryList to hold references to all post elements
  @ViewChildren('post') postElements!: QueryList<ElementRef>;
  // Array to hold posts data
  posts: PostModel[] = [];
  // Array to hold visibility status of each post
  visibilityStatus: boolean[] = [];

  constructor(
    private postService: PostService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Retrieve posts data from the service
    this.postService.getPosts().subscribe(posts => {
      // Store posts data
      this.posts = posts;
      // Initialize visibility status array with false values
      this.visibilityStatus = new Array(posts.length).fill(false);
    });
  }

  // Lifecycle hook called after component's view is initialized
  ngAfterViewInit(): void {
    // Initial visibility update after view initialization
    this.updateVisibility();
  }

  // HostListener to handle window scroll events
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateVisibility();
  }

  // Method to update visibility of each post based on scroll position
  updateVisibility(): void {
    // Check if post elements are available and posts data is loaded
    if (!this.postElements || !this.postElements.length) return;

    // Retrieve viewport height and scroll position
    if (typeof this.document !== 'undefined' && this.document.defaultView) {
      const viewportHeight = this.document.defaultView.innerHeight;
      const scrollPosition = this.document.defaultView.scrollY;

      // Loop through each post element and update visibility status
      this.postElements.forEach((postElement, index) => {
        const postTop = postElement.nativeElement.offsetTop;
        const postBottom = postTop + this.posts[index].height;
        const isVisible = postBottom > scrollPosition && postTop < scrollPosition + viewportHeight;
        this.visibilityStatus[index] = isVisible;
      });
    }
  }

  // Track by function for ngFor
  trackByFn(index: number, item: any): number {
    return index;
  }
}
