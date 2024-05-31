// post.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {PostModel} from "../shared/models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // Mock data for posts
  private mockPosts = [
    { id: 1, content: '1 post', height: 180 },
    { id: 2, content: '2 post', height: 150 },
    { id: 3, content: '3 post', height: 180 },
    { id: 4, content: '4 post', height: 250 },
    { id: 5, content: '5 post', height: 180 },
    { id: 6, content: '6 post', height: 200 },
    { id: 7, content: '7 post', height: 180 },
    { id: 8, content: '8 post', height: 210 },
    { id: 9, content: '9 post', height: 300 },
    { id: 10, content: '10 post', height: 180 },
  ];

  constructor() { }

  // Method to retrieve mock posts as an Observable
  getPosts(): Observable<PostModel[]> {
    return of(this.mockPosts);
  }
}
