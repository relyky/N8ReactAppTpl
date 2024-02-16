import { Outlet } from "react-router-dom";
import Banner from "./Banner";

export default function MainLayout() {
  //const navigation = useNavigation();

  return (
    <>
      <Banner />
      <main>
        <Outlet />
      </main>
    </>
  );
}
