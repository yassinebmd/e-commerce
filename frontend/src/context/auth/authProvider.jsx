import {  useState } from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from './authContext.jsx';


export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [token, setToken] = useState(localStorage.getItem('token'));

    

    const login = (username,token) => {
        setUsername(username);
        setToken(token);
        localStorage.setItem('username',username);
        localStorage.setItem('token',token);
    }

    const isauthenticated = !!token;
     return (
        <AuthContext.Provider value={{ username, token, login , isauthenticated}}>
            {children}
        </AuthContext.Provider>
        
     )
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;