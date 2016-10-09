import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CoursesService} from '../../../services/courses.service';
import {Subscription} from 'rxjs';
import {VideoService} from '../../../services/video.service';

@Component({
    selector: 'home',
    template: require('./edit-course.html'),
})
export class EditCourseComponent implements OnInit, OnDestroy {
    courseForm: FormGroup;
    course: {
        videoId: string,
        title: string,
        description: string,
        img: string,
        duration: string
    };
    id: string = '';
    routeSub: Subscription;
    mode: string = 'Edit';

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService,
                private videoService: VideoService,
                private location: Location,
                private fb: FormBuilder) {
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

        this.courseForm = this.fb.group({
            _id: null,
            videoId: ['', [Validators.required]],
            title: ['', [Validators.required]],
            description: [''],
            duration: ['', [Validators.required]],
            img: ['', [Validators.required]]
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
        const parsedId = this.parseYouTubeId(id);
        if (!parsedId) {
            return;
        }
        this.videoService.getDetails(parsedId).subscribe(details => {
            if (!details.items.length) {
                return;
            }
            const data = details.items[0];
            this.renderCourse({
                _id: null,
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
        this.courseForm.setValue(data);
    }

    saveCourse(data) {
        this.course = data;

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

    parseYouTubeId(url: string) {
        let ID;
        const result = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (result[2] !== undefined) {
            ID = result[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        } else if (result[0]) {
            ID = result[0].trim();
        }
        return ID;
    }
}
