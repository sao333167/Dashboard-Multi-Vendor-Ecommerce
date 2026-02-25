import { useRoutes } from 'react-router-dom'

export default function Router({allRoutes}) {

 const routes = useRoutes([...allRoutes])

 return routes;

}
