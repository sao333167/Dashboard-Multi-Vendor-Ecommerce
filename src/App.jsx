import { useEffect } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducerSlice";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  // no need to maintain state for routes since they are static
  const allRoutes = [...publicRoutes, getRoutes()];

  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token, dispatch]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
