import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";
import { summarizerApi } from "./summarizer";

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [summarizerApi.reducerPath]:summarizerApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(articleApi.middleware).concat(summarizerApi.middleware)
    
})
