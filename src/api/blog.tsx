import axios from "axios";

const apiUrl = axios.create({
  baseURL: "https://backend-mongodb-test.vercel.app",
  // PENTING!!!! HARUS ADA SAAT PEMANGGILAN LEWAT REACT-QUERY
  withCredentials: true,
});

export const getBlog = async () => {
  try {
    const response = await apiUrl.get("/blog");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById = async (id: any) => {
  try {
    const response = await apiUrl.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBlog = async (blog: any) => {
  return await apiUrl.post("/blog", blog);
};

export const updateBlog = async (blog: any) => {
  return await apiUrl.patch(`/blog/${blog._id}`, blog);
};

export const deleteBlog = async ({ id }: { id: any }) => {
  return await apiUrl.delete(`/blog/${id}`, id);
};

export const loginUser = async (user: any) => {
  return await apiUrl.post(`/login`, user);
};
