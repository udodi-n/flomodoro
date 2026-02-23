import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom'

const UseAuthUser = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            console.log("User is signed in:", firebaseUser);
            setUser(firebaseUser);
        } else {
            setUser(null);
        }
        });

        return () => unsubscribe();
    }, []);

    return user;
};

export default UseAuthUser;