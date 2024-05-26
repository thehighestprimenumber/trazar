import Home from "../screens/Home";
import Login from "../screens/Login";
import withUserMenu from "../components/withUserMenu";
import GeneralReportView from "../screens/GeneralReportView";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}
export const Paths = {
  Landing: '',
  Home: '/home',
  Login: '/login',
  GeneralReport: '/report',
}
const routes: RouteType[] = [
  {
    path: Paths.Landing,
    component: withUserMenu(Home),
    name: "Home Screen",
    protected: true,
  },
  {
    path: Paths.Home,
    component: withUserMenu(Home),
    name: "Home Screen",
    protected: true,
  },
    {
    path: Paths.GeneralReport,
    component: withUserMenu(GeneralReportView),
    name: "Reporte General",
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
