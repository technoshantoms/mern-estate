import { Header, Icon, Table } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Button } from "semantic-ui-react";
import OAuth from "../components/OAuth";
import { useOktaAuth } from "@okta/okta-react";

export default function SignIn() {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        console.log(JSON.stringify(info));
        console.table(info);

        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  if (!authState) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      {authState.isAuthenticated && userInfo && (
        <div>
          <p>
            Welcome back,&nbsp;
            {userInfo.name}!
          </p>
          <ul>
          {/* {
            for(const[key, value] of Object.entries(userInfo)){
              ()
            }
          } */}
          </ul>
          {/* <Table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userInfo).map((claimEntry) => {
              const claimName = claimEntry[0];
              const claimValue = claimEntry[1];
              const claimId = `claim-${claimName}`;
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{claimValue.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table> */}
 
        </div>
      )}
   {!authState.isAuthenticated
        && (
          <div>
          <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="border p-3 rounded-lg"
              id="password"
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth />
            <Button id="login-button" primary onClick={login}>
              Okta Login
            </Button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Dont have an account?</p>
            <Link to={"/sign-up"}>
              <span className="text-blue-700">Sign up</span>
            </Link>
          </div>
          </div>
        )}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
