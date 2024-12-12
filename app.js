// Start Authorization Flow
document.getElementById('start-auth').addEventListener('click', () => {
    const authUrl = document.getElementById('auth-url').value;
    const clientId = document.getElementById('client-id').value;
    const redirectUri = document.getElementById('redirect-uri').value;
    const scope = document.getElementById('scope').value;

    const url = `${authUrl}?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=state123`;

    window.location.href = url;
});

// Handle Token Exchange
document.getElementById('exchange-token').addEventListener('click', async () => {
    const tokenUrl = document.getElementById('token-url').value;
    const authCode = document.getElementById('auth-code').value;
    const clientId = document.getElementById('client-id').value;
    const clientSecret = document.getElementById('client-secret').value;
    const redirectUri = document.getElementById('redirect-uri').value;

    const params = new URLSearchParams({
        code: authCode,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });

        const result = await response.json();
        document.getElementById('token-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('token-response').textContent = `Error: ${error.message}`;
    }
});

// Handle Redirection and Display Code (Optional)
const params = new URLSearchParams(window.location.search);
const authCode = params.get('code');
if (authCode) {
    document.getElementById('auth-code').value = authCode;
    document.body.insertAdjacentHTML('beforeend', `<p>Authorization Code: ${authCode}</p>`);

// Handle API Requests
document.getElementById('send-api-request').addEventListener('click', async () => {
    const apiUrl = document.getElementById('api-url').value;
    const accessToken = document.getElementById('access-token').value;
    const method = document.getElementById('api-method').value;
    const body = document.getElementById('api-body').value;

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
    };

    // Include the body for POST/PUT requests
    if (method === 'POST' || method === 'PUT') {
        try {
            options.body = JSON.stringify(JSON.parse(body));
        } catch (error) {
            document.getElementById('api-response').textContent = `Invalid JSON in Request Body: ${error.message}`;
            return;
        }
    }

    try {
        const response = await fetch(apiUrl, options);
        const responseData = await response.json();
        document.getElementById('api-response').textContent = JSON.stringify(responseData, null, 2);
    } catch (error) {
        document.getElementById('api-response').textContent = `Error: ${error.message}`;
    }
});
}
