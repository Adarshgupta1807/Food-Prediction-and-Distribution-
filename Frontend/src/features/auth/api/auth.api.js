import axiosInstance from "../../../shared/api/axiosInstance";

export async function registerUser({ username, email, password, role }) {
    const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
        role,
    });
    return res.data;
}

export async function loginUser({ email, password }) {
    const res = await axiosInstance.post("/auth/login", { email, password });
    return res.data;
}

export async function logoutUser() {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}
