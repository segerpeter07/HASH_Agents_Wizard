import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import agentsReducer from './reducers/agentsReducer';

const configureStore = () => {
    return createStore(agentsReducer, composeWithDevTools());
}

export default configureStore;