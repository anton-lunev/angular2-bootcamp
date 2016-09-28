import {ActionReducer, Action} from '@ngrx/store';
import * as coursesActions from './courses.actions';

export const courses: ActionReducer<any> = (state = [], action: Action) => {
    switch (action.type) {
        case coursesActions.COURSES_LIST:
            return action.payload;
        case coursesActions.COURSE_CREATE:
            return [...state, action.payload];
        case coursesActions.COURSE_UPDATE:
            return state.map(course => {
                return course._id.$oid === action.payload._id.$oid
                    ? Object.assign({}, course, action.payload)
                    : course;
            });
        case coursesActions.COURSE_DELETE:
            return state.filter(course => course._id.$oid !== action.payload._id.$oid);
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
