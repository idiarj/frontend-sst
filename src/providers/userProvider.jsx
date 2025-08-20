import { useState, useEffect } from "react";
import { achetetepese } from "../utils/fetch.js";
import { UserContext } from "../context/UserContext.jsx";


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer una llamada a la API para obtener los permisos del usuario
    const fetchUser = async () => {
      const response = await achetetepese.get({
        endpoint: '/auth/me',
        credentials: 'include'
      })
      console.log(response)
      const data = await response.json();
      console.log(data)
      if (!response.ok ) {
        setUser(null);
        return;
      }
      setUser(data.data);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};