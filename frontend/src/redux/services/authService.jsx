export async function signInService(email, password) {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
        const data = await response.json();
        const token = data.body.token;
        return token;
    } else {
        throw new Error("Incorrect email/password");
    }

}