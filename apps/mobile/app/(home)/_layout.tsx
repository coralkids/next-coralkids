import { AuthProtected } from "../components/AuthProtected";
import useLoadResources from "../hooks/useLoadResources";

export default function Layout() {
  useLoadResources();

  return <AuthProtected />;
}
