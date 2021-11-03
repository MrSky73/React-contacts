import * as RB from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const loginStatus = useSelector((state) => state.isLoggedin);
  const name = localStorage.getItem("name");
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
  };

  return (
    <RB.Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <RB.Container>
        <RB.Navbar.Brand>My Assignment</RB.Navbar.Brand>
        <RB.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {loginStatus && (
          <RB.Navbar.Collapse id="responsive-navbar-nav">
            <RB.Nav className="justify-content-end flex-grow-1 ">
              <RB.Navbar.Text className="mx-5" href="#features">
                Hello , {name}
              </RB.Navbar.Text>
              <RB.Button variant="outline-danger" onClick={logoutHandler}>
                Logout
              </RB.Button>
            </RB.Nav>
          </RB.Navbar.Collapse>
        )}
      </RB.Container>
    </RB.Navbar>
  );
};

export default Header;
