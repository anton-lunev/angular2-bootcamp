import { ActionReducer, Action } from '@ngrx/store';

export const auth: ActionReducer<any> = (state = null, action: Action) => {
    console.log(action);

    switch (action.type) {
        case 'USER_LOADED':
            return action.payload;
        case 'USER_LOGOUT':
        case 'USER_ERROR':
            return null;
        default:
            return state;
    }
};
