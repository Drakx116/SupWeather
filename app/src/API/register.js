export const registerAndRedirect = (data, props) => {
    fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers : {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if(!(data.error)) {
                props.history.push('/login');
            }
        });
};