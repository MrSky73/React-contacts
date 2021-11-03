import Header from "./components/Header";
import Tabs from "./components/Tabs";
import LoginForm from "./components/Login";
import { useSelector } from "react-redux";

function App() {
  const loginStatus = useSelector((state) => state.isLoggedin);

  return (
    <div className="App">
      <Header />
      {!loginStatus && <LoginForm />}
      {loginStatus &&  <Tabs />}
    </div>
  );
}

export default App;
