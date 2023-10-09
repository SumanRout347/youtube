import { configureStore } from "@reduxjs/toolkit"

import modeReducer from "./modeSlice"
import searchReducer from "./searchSlice"
import videoReducer from "./videoSlice"
import chatReducer from "./chatSlice"

export const store=configureStore({
    reducer:{
      mode:modeReducer,
      search:searchReducer,
      videos:videoReducer,
      chat:chatReducer
    }
})