import apiClient from ".";

export async function createUser(user) {
  try {
    const resp = await apiClient.post("/user/create", user);

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
