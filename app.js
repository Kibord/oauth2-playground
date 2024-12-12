document.getElementById('start-auth').addEventListener('click', () => {
    const authUrl = document.getElementById('auth-url').value;
    const clientId = document.getElementById('client-id').value;
    const redirectUri = document.getElementById('redirect-uri').value;
    const scope = document.getElementById('scope').value;

    const url = `${authUrl}?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=state123`;

    document.getElementById('instructions').textContent = 'Redirecting to the authorization server...';
    window.location.href = url;
});
