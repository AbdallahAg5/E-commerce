import {configureStore , combineReducers} from '@reduxjs/toolkit'
import LoginReducer from './loginReducer'
import ProductsReducer from './productsReducer'
import QuestionReducer  from './questionReducer'
import ResultReducer  from './resultReducer'



const rootReducer=combineReducers({
        questions: QuestionReducer,
        result: ResultReducer,
        login: LoginReducer,
        products:ProductsReducer
})


// create store 

export default configureStore({ reducer: rootReducer })