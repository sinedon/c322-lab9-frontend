function checkToken(token) {
    try {
        const decoded = parseJwt(token);
        console.log('Decoded token:', decoded);

        if (decoded.exp < Date.now() / 1000) {
            console.log('Token is expired');
            return { valid: false, message: 'Token has expired' };
        }

        // Additional validations
        
        console.log('Token is valid');
        return { valid: true, message: 'Token is valid' };

    } catch (error) {
        console.error('Error decoding token:', error);
        return { valid: false, message: 'Invalid token' };
    }
}


// Function to parse JWT token payload
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


