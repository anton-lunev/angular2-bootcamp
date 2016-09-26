import {routerReducer} from 'ngrx-store-router';
import {auth} from './auth/auth.reducer';
import {courses} from './courses/courses.reducer';

export const reducers = {
    router: routerReducer,
    user: auth,
    courses: courses
};
