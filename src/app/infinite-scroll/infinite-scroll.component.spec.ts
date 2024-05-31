// infinite-scroll.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfiniteScrollComponent } from './infinite-scroll.component';
import { PostService } from './post.service';

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfiniteScrollComponent ],
      imports: [ HttpClientTestingModule ], // Import HttpClientTestingModule
      providers: [ PostService ] // Provide the MockPostService
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on initialization', () => {
    spyOn(component, 'loadPosts').and.callThrough(); // Spy on loadPosts method
    component.ngOnInit(); // Call ngOnInit manually
    expect(component.loadPosts).toHaveBeenCalled(); // Check if loadPosts was called
    expect(component.posts.length).toBeGreaterThan(0); // Check if posts are loaded
  });

  // Add more tests as needed...
});
