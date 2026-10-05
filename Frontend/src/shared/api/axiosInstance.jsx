import axios from "axios";
import { BASE_URL } from "../utils/constant";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Hard redirect hata diya — ab 401 sirf reject hoga,
// jo calling code (context ka catch block) handle karega
export default axiosInstance;