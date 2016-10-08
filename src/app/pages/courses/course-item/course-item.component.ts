import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'course-item',
    template: require('./course-item.html'),
    styles: [require('./course-item.pcss')],
})
export class CourseItemComponent {
    @Input() course;
    @Output() onDelete: EventEmitter<any> = new EventEmitter();
    @Output() onPlay: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    playVideo() {
        this.onPlay.emit(this.course);
    }

    deleteItem() {
        this.onDelete.emit(this.course);
    }
}
