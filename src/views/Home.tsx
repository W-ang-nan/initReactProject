import { useAppDispatch, useAppSelector, useGetToken } from "@/utils/Hooks";
import { setStoreToken, setUserData, logout } from "@/store/slice/userSlice";
import { Button } from "antd";

const Home = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.user);
  console.log(selector.token);
  const setToken = (token: string) => {
    dispatch(setStoreToken(token));
  };
  const setData = (data: any) => {
    dispatch(setUserData(data));
  };
  const exit = () => {
    dispatch(logout());
  };

  function IsLogin() {
    if (useGetToken()) {
      return (
        <Button type="primary" danger onClick={() => exit()}>
          logout
        </Button>
      );
    }
  }

  return (
    <div>
      <Button type="primary" onClick={() => setToken("123")}>
        set token
      </Button>
      <Button type="primary" onClick={() => setData({ name: "123", age: 123 })}>
        set Data
      </Button>
      <IsLogin />
    </div>
  );
};
export default Home;
