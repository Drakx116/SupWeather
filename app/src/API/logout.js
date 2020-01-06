// Fetch /auth/logout, check tokens
import cookie from "react-cookies";

export const logout = (data, props) => {
    fetch('http://localhost:3000/auth/logout',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(() => {
            cookie.remove('token');
            cookie.remove('user');

            // Redirect
            window.location.reload();
        })

        .catch( error => console.error('Error', error) );
};
