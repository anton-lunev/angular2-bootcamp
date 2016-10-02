import {Component, OnInit, OnDestroy} from '@angular/core';
import {CoursesService} from '../../../services/courses.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {VideoService} from '../../../services/video.service';

@Component({
    selector: 'home',
    template: require('./edit-course.html'),
})
export class EditCourseComponent implements OnInit, OnDestroy {
    course: Object;
    id: string = '';
    routeSub: Subscription;
    mode: string = 'Edit';

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService,
                private videoService: VideoService,
                private location: Location) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id !== 'new') {
                this.getCourse();
            } else {
                this.mode = 'Add';
                this.renderCourse({
                    title: '',
                    description: '',
                    img: ''
                });
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    getCourse() {
        this.coursesService
            .getCourse(this.id)
            .subscribe(res => this.renderCourse(res));
    }

    getVideoDetails(id: string) {
        this.videoService.getDetails(id).subscribe(details => {
            console.log(details);
            if (!details.items.length) {
                return;
            }
            const data = details.items[0];
            this.renderCourse({
                videoId: data.id,
                title: data.snippet.title,
                description: data.snippet.description,
                img: data.snippet.thumbnails.high.url,
                duration: this.videoService.convertDuration(data.contentDetails.duration)
            });
        });
    }

    renderCourse(data) {
        this.course = data;
    }

    saveCourse() {
        let request;
        if (this.mode === 'Edit') {
            Object.assign(this.course, {_id: {$oid: this.id}});
            request = this.coursesService.updateCourse(this.course);
        } else {
            request = this.coursesService.createCourse(this.course);
        }
        request.subscribe(() => this.goBack());
    }

    goBack() {
        this.location.back();
    }
}
