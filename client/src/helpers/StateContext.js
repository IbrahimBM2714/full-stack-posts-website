import { createContext, useState, useEffect } from "react";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    id: 0,
    satus: false,
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    const username = localStorage.getItem("username");
    const status = localStorage.getItem("status");

    if (id && username) {
      console.log("reeeeeeeeeeeeeeee");
      setUser({
        id: id,
        username: username,
        status: status,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("id", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("status", user.status);
  }, [user]);

  return (
    <StateContext.Provider value={{ user, setUser }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider };
