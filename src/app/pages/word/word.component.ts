import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  word: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.word = this.route.snapshot.params['word'];
  }

}
