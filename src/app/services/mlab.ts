import 'rxjs/add/operator/toPromise';

export class MLab {
    protected baseUrl = 'https://api.mlab.com/api/1/databases';
    protected apiKey = 'hlrhBvtVSrE1yzYRCfG4A4Q4ZaA00mn9';
    protected db = 'angular2_db';
    protected collection = '';

    getQueryUrl() {
        return `${this.baseUrl}/${this.db}/collections/${this.collection}?apiKey=${this.apiKey}`;
    }
}
