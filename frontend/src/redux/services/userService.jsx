export async function updateUsernameService(token, newUsername) {
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ userName: newUsername }),
        });
        if (response.ok) {
            const data = await response.json();
            return data.body.userName;
        } else {
            throw new Error('Invalid Fields');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}