import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { StateContext } from "../helpers/StateContext";

const Navbar = () => {
  const { user, setUser } = useContext(StateContext);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#712cf9",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "50px",
            listStyle: "none",
            margin: "0px",
            padding: "15px",
          }}
        >
          <li>
            <Link
              style={{
                color: "white",
                textDecoration: "none",
              }}
              to={"/"}
            >
              Posts
            </Link>
          </li>

          {user.status === false || user.status === undefined ? (
            <>
              <li>
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                  to={"/login"}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                  to={"/register"}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                  to={"/create-post"}
                >
                  Create post
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                  to="/login"
                  onClick={() => {
                    setUser({ username: "", id: 0, status: false });
                    localStorage.removeItem("accessToken");
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          {user.status && <div style={{ color: "white" }}>{user.username}</div>}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
