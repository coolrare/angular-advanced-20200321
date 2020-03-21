import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Article } from '../article';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  article: Article;

  constructor(private route: ActivatedRoute, private articleService: PostService) { }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   console.log(params.id);
    // });

    this.route.paramMap.subscribe(params => {
      this.articleService.getArticle(params.get('id')).subscribe(article => {
        this.article = article.article;
      });
    });
  }

}
