const defaultState = {
    appName: 'Devscore  Infrastructure Integration',
    token: null,
    currentUser: '',
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'APP_LOAD':
            return {
                ...state,
                token: state.token || null,
                appLoaded: true,
                currenUser: action.paiload ? action.payload.user : null,
            };
        case 'REDIRECT':
            return { ...state, redirecTo: null };
        case 'LOGIN':
            return {
                ...state,
                redirecTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user,
            };
    }
    return state;
}