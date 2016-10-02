import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(value: any, query: string = ''): any {
        const exp = new RegExp(query, 'i');
        return value.filter(item => ~item.title.search(exp) || ~item.description.search(exp));
    }
}
