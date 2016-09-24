import {auth} from './auth/auth.reducer';
import {routerReducer} from 'ngrx-store-router';

export const reducers = {
    router: routerReducer,
    user: auth
};
