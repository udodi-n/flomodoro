import useAuthUser from "./UseAuthUser";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckUser({navOne, action}) {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const user = useAuthUser();

  useEffect(() => {
    if (!user) return;

    setAuthUser(user);
    console.log("user");
    action({ token: authUser, user: user });
    navigate(navOne);
  }, [user]);

  return null;
}

export default CheckUser;
