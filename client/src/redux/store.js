import {configureStore , combineReducers} from '@reduxjs/toolkit'
import LoginReducer from './loginReducer'
import QuestionReducer  from './questionReducer'
import ResultReducer  from './resultReducer'



const rootReducer=combineReducers({
        questions: QuestionReducer,
        result: ResultReducer,
        login: LoginReducer
})


// create store 

export default configureStore({ reducer: rootReducer })