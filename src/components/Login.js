import * as RB from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState, useReducer, useRef, useEffect } from "react";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@") && action.val.length > 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@") && state.value.length > 6,
    };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 6 };
  }
  return { value: "", isValid: false };
};

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 2 };
  }
  return { value: "", isValid: false };
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: nameIsValid } = nameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        emailState.isValid && passwordState.isValid && nameState.isValid
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateNameHandler = () => {
    dispatchName({ type: "INPUT_BLUR" });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const loginHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      dispatch({ type: "LOGIN", payload: nameState.value });
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("name", nameState.value);
    } else if (!nameIsValid) {
      nameInputRef.current.focus();
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <RB.Container
      className="mt-5"
      style={{ maxWidth: "50%", minWidth: "25em" }}
    >
      <RB.Form>
        <RB.Row>
          <RB.Col md>
            <RB.Form.Group className="mb-3" controlId="formBasicFName">
              <RB.Form.Label>First Name</RB.Form.Label>
              <RB.Form.Control
                type="text"
                placeholder="Obi-wan"
                ref={nameInputRef}
                id="name"
                onChange={nameChangeHandler}
                onBlur={validateNameHandler}
                value={nameState.value}
                isValid={nameIsValid}
                autoComplete="off"
              />
            </RB.Form.Group>
          </RB.Col>
          {/* <RB.Col md>
            <RB.Form.Group className="mb-3" controlId="formBasicLName">
              <RB.Form.Label>Last Name</RB.Form.Label>
              <RB.Form.Control type="text" placeholder="Snow" />
            </RB.Form.Group>
          </RB.Col> */}

          <RB.Form.Group className="mb-3" controlId="formBasicEmail">
            <RB.Form.Label>Email address</RB.Form.Label>
            <RB.Form.Control
              type="email"
              ref={emailInputRef}
              id="email"
              placeholder="khaleesi@dragon.com"
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
              value={emailState.value}
              isValid={emailIsValid}
              autoComplete="off"
            />
            <RB.Form.Text className="text-muted">
              Entered Email should be valid.
            </RB.Form.Text>
          </RB.Form.Group>

          <RB.Form.Group className="mb-3" controlId="formBasicPassword">
            <RB.Form.Label>Password</RB.Form.Label>
            <RB.Form.Control
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
              id="password"
              label="password"
              type="password"
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              value={passwordState.value}
              isValid={passwordIsValid}
            />
            <RB.Form.Text className="text-muted">
              Entered Password must have 7 characters.
            </RB.Form.Text>
          </RB.Form.Group>
        </RB.Row>
        <RB.Button variant="primary" type="submit" onClick={loginHandler}>
          Login
        </RB.Button>
      </RB.Form>
    </RB.Container>
  );
};

export default LoginForm;
