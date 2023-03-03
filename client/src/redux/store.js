import {configureStore , combineReducers} from '@reduxjs/toolkit'
import LoginReducer from './loginReducer'
import ProductsReducer from './productsReducer'



const rootReducer=combineReducers({
        login: LoginReducer,
        products:ProductsReducer
})


// create store 
export default configureStore({ reducer: rootReducer })