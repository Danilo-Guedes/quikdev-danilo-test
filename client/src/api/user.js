import apiClient from ".";

export async function createUser(user) {

    const resp = await apiClient.post('/user/create', user);

    console.log({resp});

    return resp.data
}