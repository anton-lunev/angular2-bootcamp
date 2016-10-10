import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {DateFormatter} from '@angular/common/src/facade/intl';
import {YoutubeVideoCollection} from './video';

@Injectable()
export class VideoService {
    private key: string = 'AIzaSyClORzAyqaTgzj4M5twnlvLX2zohH1Auc0';
    private apiUrl: string = 'https://www.googleapis.com/youtube/v3/';

    constructor(private http: Http) {
    }

    searchVideos(query: string): Observable<YoutubeVideoCollection> {
        const params = new URLSearchParams();
        params.set('key', this.key);
        params.set('part', 'snippet');
        params.set('type', 'video');
        params.set('maxResults', '50');
        params.set('q', query);

        return this.http
            .get(this.apiUrl + 'search', {search: params})
            .map(response => response.json());
    }

    getDetails(id: string): Observable<YoutubeVideoCollection>  {
        const params = new URLSearchParams();
        params.set('key', this.key);
        params.set('part', 'snippet,contentDetails');
        params.set('id', id);

        return this.http
            .get(this.apiUrl + 'videos', {search: params})
            .map(response => response.json());
    }

    convertDuration(duration: string): string {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        const hours = (parseInt(match[1]) || 0);
        const minutes = (parseInt(match[2]) || 0);
        const seconds = (parseInt(match[3]) || 0);
        const date = new Date();
        date.setHours(hours, minutes, seconds);

        return DateFormatter.format(date, 'en-US', 'HH:mm:ss');
    }
}
