import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'course-item',
    template: require('./course-item.html'),
})
export class CourseItemComponent {
    @Input() course;
    @Output() onDelete: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    deleteItem() {
        this.onDelete.emit(this.course);
    }
}
