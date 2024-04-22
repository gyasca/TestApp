// User authentication
import { jwtDecode } from "jwt-decode";

export function validateAdmin() {
    try {
        const token = localStorage.getItem('accessToken');
        const decoded = jwtDecode(token);
        console.log("decoded token: ",decoded);
        if (decoded.user.account_type == "hr") {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

export function validateUser() {
    try {
        const token = localStorage.getItem('accessToken');
        const decoded = jwtDecode(token);
        return true;
    } catch {
        return false;
    }
}