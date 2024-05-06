import { useAppDispatch, useAppSelector } from "@/utils/Hooks";
import { setStoreToken, setUserData, logout } from "@/store/slice/userSlice";
const Home = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.user);
  console.log(selector);
  const setToken = (token: string) => {
    dispatch(setStoreToken(token));
  };
  const setData = (data: any) => {
    dispatch(setUserData(data));
  };
  const exit = () => {
    dispatch(logout());
  };
  return (
    <div>
      <AButton type="primary" onClick={() => setToken("123")}>
        set token
      </AButton>
      <AButton
        type="primary"
        onClick={() => setData({ name: "123", age: 123 })}
      >
        set Data
      </AButton>
      <AButton type="primary" danger onClick={() => exit()}>
        logout
      </AButton>
    </div>
  );
};
export default Home;
