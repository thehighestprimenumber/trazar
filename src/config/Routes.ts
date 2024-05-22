import Home from "../screens/Home";
import Login from "../screens/Login";
import withUserMenu from "../components/withUserMenu";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}
export const Paths = {
  Landing: '',
  Home: '/home',
  Login: '/login'
}
const routes: RouteType[] = [
  {
    path: Paths.Home,
    component: withUserMenu(Home),
    name: "Home Screen",
    protected: true,
  },
  {
    path: Paths.Login,
    component: Login,
    name: "Login Screen",
    protected: false,
  },
];

export default routes;
