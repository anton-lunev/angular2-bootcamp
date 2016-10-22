import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'time'
})

export class TimePipe implements PipeTransform {
    transform(value: any): any {
        if (!value) {
            return '';
        }
        const date = new Date();
        date.setHours(0, 0, value);

        let result = '';
        if (date.getHours()) {
            result += `${date.getHours()}h `;
        }
        if (date.getMinutes()) {
            result += `${date.getMinutes()}min `;
        }
        if (date.getSeconds()) {
            result += `${date.getSeconds()}s`;
        }

        return result;
    }
}
