import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
// user 
import loginSaga from './user/login/saga'
import authLoginReducer from './user/login/slice'
import signupSaga from './user/signup/saga'
import authSignUpReducer from './user/signup/slice'
// schedule
import animeRecentlySaga from './schedule/animeRecently/saga'
import animeRecentlyReducer from './schedule/animeRecently/slice'

// schedule Category
import animeCategorySaga from './schedule/animeCategory/saga'
import animeCategoryReducer from './schedule/animeCategory/slice'

// scheduleSlug
import animeSlugSaga from './schedule/animeSlug/saga'
import animeSlugReducer from './schedule/animeSlug/slice'

// scheduleVideo
import animeVideoSaga from './schedule/animeVideo/saga'
import animeVideoReducer from './schedule/animeVideo/slice'

// Comment
import animeCommentSaga from './comment/saga'
import animeCommentReducer from './comment/slice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        login: authLoginReducer,
        signup: authSignUpReducer,
        animeRecently: animeRecentlyReducer,
        animeCategory: animeCategoryReducer,
        animeSlug: animeSlugReducer,
        animeVideo: animeVideoReducer,
        comment: animeCommentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }).concat(sagaMiddleware),
})

sagaMiddleware.run(loginSaga)
sagaMiddleware.run(signupSaga)
sagaMiddleware.run(animeRecentlySaga)
sagaMiddleware.run(animeCategorySaga)
sagaMiddleware.run(animeSlugSaga)
sagaMiddleware.run(animeVideoSaga)
sagaMiddleware.run(animeCommentSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
