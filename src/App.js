
import { useSelector } from "react-redux";
import Body from "./components/Body";
import Header from "./components/Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";


function App() {
  const slider = useSelector((store) => store.mode.slider);
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Body/>,
      children:[
        {
          path:"/",
          element:<MainContainer/>
        },
        {
          path:"/watch",
          element:<WatchPage/>
        }
      ]
    }
  ])
  return <div className={slider?" dark:bg-slate-700 bg-zinc-300 ":" dark:bg-slate-800 "}>
    <Header/>
    <RouterProvider router={router}/>
  </div>;
}

export default App;
