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
            console.log(data);
            cookie.save('token', data.token);
            cookie.save('user', data.id);

            // Redirect
            window.location.reload();
        })

        .catch( error => console.error('Error', error) );
};
