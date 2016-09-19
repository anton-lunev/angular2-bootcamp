import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'course-item',
    template: require('./course-item.html'),
})
export class CourseItemComponent{
    @Input() course;

    constructor() {
    }
}
