import API_URL from "./api";

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`)
    const data = await response.json();
    return data
}