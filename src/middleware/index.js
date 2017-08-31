const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        action.payload.then(response => {
                action.payload = response;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            });

        return;
    }

    return next(action);
};

function isPromise(item) {
    return item && typeof item.then === 'function';
}

export {
    promiseMiddleware
}