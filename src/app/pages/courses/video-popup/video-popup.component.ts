import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'video-popup',
    template: require('./video-popup.html'),
    styles: [require('./video-popup.pcss')]
})
export class VideoPopupComponent implements OnInit, OnChanges {
    @Input() videoId: string;
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    show: boolean = false;
    baseUrl: string = 'https://www.youtube.com/embed/';
    videoUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {

    }

    ngOnChanges(changes) {
        if (changes.videoId) {
            this.show = !!this.videoId;
            if (this.show) {
                this.setUrl();
            }
        }
    }

    close() {
        this.videoId = '';
        this.show = false;
        this.onClose.emit();
    }

    setUrl() {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.videoId);
    }
}
