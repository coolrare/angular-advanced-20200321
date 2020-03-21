import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Articles, Article } from '../article';
import { Observable, of, throwError } from 'rxjs';
import { map, shareReplay, share, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  articles: Article[];

  articles$: Observable<Articles>;
  articleList$: Observable<Article[]>;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    // this.postService.getArticles().subscribe(articles => {
    //   this.articles = articles.articles;
    //   console.log(this.articles);
    // });

    // this.articles$ = this.postService.getArticles();

    this.postService.getArticles().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {}
    });


    this.articleList$ = this.postService.getArticles().pipe(
      map(articles => articles.articles),
      catchError(() => {
        // alert('error');
        // this.router.navigateByUrl('/error');
        return throwError({});
        // return of();
      }),
      share()
    );
  }

}
