import apiClient from ".";

export async function fetchPosts() {
  try {
    const resp = await apiClient.get("/api/posts");

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createPost(data) {
  try {
    const resp = await apiClient.post("/api/posts", data);

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
