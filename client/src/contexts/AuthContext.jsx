import { createContext} from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../services/authService'
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [auth, setAuth] = usePersistedState('auth', {});


    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.login(values.email, values.password);
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            navigate('/');
        } catch (error) {
            if (error.code === 403) {
                alert('Wrong username/password');
            } else {
                alert('Login error:', error);
            }
        }
    }

    const registerSubmitHandler = async (values) => {
        try {
            const result = await authService.register(values.email, values.password);
            
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            navigate('/');
        } catch (error) {
            if (error.code == 400) {
                alert('Invalid input or email is already taken');
            } else {
                alert('Registration failed.');
            }
    }}

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
        navigate('/');
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        isAuthenticated: !!auth.email,
        _id: auth._id
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>

    )
}