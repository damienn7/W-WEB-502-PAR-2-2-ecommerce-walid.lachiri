import { createStore } from 'redux';
import { defaultI18nProvider, adminReducer, createAppReducer } from 'react-admin';
import { all, fork } from 'redux-saga/effects';
import { createHashHistory } from 'history';

const createAdminStore = ({
    dataProvider,
    authProvider,
    i18nProvider,
    initialState,
    locale
} = {}) => {
    const saga = function* rootSaga() {
        yield all([fork(defaultI18nProvider(dataProvider, authProvider, i18nProvider))]);
        // add your other sagas here
    };
    const reducer = createAppReducer(adminReducer, locale);
    const history = createHashHistory();

    const store = createStore(reducer, initialState);
    return {
        store,
        history,
        saga,
        dataProvider,
    };
};

export default createAdminStore;
