import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(value: any, query: string = ''): any {
        return value.filter(item => item.title.includes(query) || item.description.includes(query));
    }
}
