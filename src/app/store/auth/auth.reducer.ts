import { ActionReducer, Action } from '@ngrx/store';
import * as authActions from './auth.actions';

export const auth: ActionReducer<any> = (state = null, action: Action) => {
    console.log(action);

    switch (action.type) {
        case authActions.USER_LOADED:
            return action.payload;
        case authActions.USER_LOGOUT:
        case authActions.USER_ERROR:
            return null;
        default:
            return state;
    }
};
