import { ConfigProvider } from "antd";
import Router from "@/router/router";
// 枚举路由
// const Path = {
//   Home: "/",
//   UserList: "/userlist",
// };
const App = () => {
  return (
    <ConfigProvider>
      <Router />
      {/* <Routes>
          <Route path={Path.Home} element={<Home />} />
        </Routes> */}
    </ConfigProvider>
  );
};
export default App;
