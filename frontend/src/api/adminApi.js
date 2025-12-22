import axiosInstance from "./axiosInstance";

export const stats = async () => {
  const response = await axiosInstance.get("/admin/stats");
  return response.data;
};
