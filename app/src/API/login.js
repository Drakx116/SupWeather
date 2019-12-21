import cookie from "react-cookies";

export const authAndRedirect = (data, props) => {
    fetch('http://localhost:3000/auth/login',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            cookie.save('token', data.token);

            // Redirect
            props.history.push('/');
        })

        .catch( error => console.error('Error', error) );
};
