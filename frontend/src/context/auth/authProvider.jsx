import { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './authContext.jsx';

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token');
        try {
            return JSON.parse(storedToken); // Parse JSON if stored as such
        } catch {
            return storedToken; // Return plain string if not JSON
        }
    });

    const isauthenticated = !!token;

    const login = (username, token) => {
        setUsername(username);
        const tokenString = typeof token === "object" ? JSON.stringify(token) : token;
        setToken(tokenString);
        localStorage.setItem('username', username);
        localStorage.setItem('token', tokenString);
    };

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setUsername(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ username, token, login, isauthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
