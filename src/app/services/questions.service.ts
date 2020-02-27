import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion } from '../models/question';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class QuestionsService {
    private _questions = new BehaviorSubject<IQuestion[]>([]);
    private dataStore: { questions: IQuestion[] } = { questions: [] };
    readonly questions = this._questions.asObservable();
    private questionsStream = 10;
    private index = 0;

    constructor(private http: HttpClient){ }
    getStreamedQuestions() {
        this.http.get<IQuestion[]>('https://private-anon-f4b8190d8a-blissrecruitmentapi.apiary-mock.com/questions?limit=limit&offset=offset&filter=filter')
            .subscribe(
                data => {
                    if(this.index < data.length - 1) {
                        while ( this.index < this.questionsStream) {
                            this.dataStore.questions.push(data[this.index]);
                            this.index++;
                        }
                    }
                    this.questionsStream += this.questionsStream;
                    this._questions.next(Object.assign({}, this.dataStore).questions);
            },
            error => console.log('Could not load questions.')
        );
    }
    getAllQuestions() {
        this.http.get<IQuestion[]>('https://private-anon-f4b8190d8a-blissrecruitmentapi.apiary-mock.com/questions?limit=limit&offset=offset&filter=filter')
        .subscribe(
            data => {
                this.dataStore.questions = data;
                this._questions.next(Object.assign({}, this.dataStore).questions);
              },
              error => console.log('Could not load questions.')
        );
    }
}