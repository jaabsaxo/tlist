import { configureStore } from '@reduxjs/toolkit'
import trackingReducer from './features/tracking/trackingSlice'

const store = configureStore({
  reducer: {
    tracking: trackingReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;