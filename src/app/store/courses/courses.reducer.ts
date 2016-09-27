import {ActionReducer, Action} from '@ngrx/store';
import * as coursesActions from './courses.actions';

export const courses: ActionReducer<any> = (state = [], action: Action) => {
    switch (action.type) {
        case coursesActions.COURSES_LIST:
            return action.payload;
        default:
            return state;
    }
};

export const coursesFilter: ActionReducer<any> = (state = {searchText: ''}, action: Action) => {
    switch (action.type) {
        case coursesActions.SEARCH_TEXT:
            return Object.assign({}, state, {searchText: action.payload});
        default:
            return state;
    }
};
