import { Outlet } from "react-router-dom";

export default function MainLayout() {
  //const navigation = useNavigation();

  return (
    <main>
      <h1>這是 MainLayout</h1>
      <Outlet />
    </main>
  );
}
