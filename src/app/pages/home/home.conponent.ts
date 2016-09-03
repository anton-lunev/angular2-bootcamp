import {Component} from '@angular/core'

@Component({
    selector: 'home',
    template: require('./home.html'),
})
export class HomeComponent {
    list = [
        {
            img: 'http://lorempixel.com/300/200/',
            title: 'Card title',
            description: 'This is a longer card with supporting text below'
        },
        {
            img: 'http://lorempixel.com/300/200/',
            title: 'Card title',
            description: 'This is a longer card with supporting text below'
        },
        {
            img: 'http://lorempixel.com/300/200/',
            title: 'Card title',
            description: 'This is a longer card with supporting text below'
        },
        {
            img: 'http://lorempixel.com/300/200/',
            title: 'Card title',
            description: 'This is a longer card with supporting text below'
        }
    ]
}
