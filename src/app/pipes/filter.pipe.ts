import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../models/question';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: IQuestion[], searchText: string): any[] {
        if(!items) {
            return [];
        }
        if(!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter( it => {
        return it.question.toLowerCase().includes(searchText);
        });
   }
}