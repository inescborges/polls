import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionsService } from '../services/questions.service';
import { IQuestion } from '../models/question';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private questionsObj;
  loadQuestions: Observable<IQuestion[]>;
  public searchText: string;

  constructor(private questionsService: QuestionsService){ }
  ngOnInit() {
    this.getQuestions();
  }

  loadMore() {
    this.getQuestions();
  }
  
  getQuestions() {
    this.loadQuestions = this.questionsService.questions;
    this.questionsService.getStreamedQuestions();
    this.questionsObj = Object.assign({}, this.loadQuestions);
  }

}