// User authentication
import { jwtDecode } from "jwt-decode";

export function validateAdmin() {
    try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        if (decoded.user.account_type == "human_resource_personnel") {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

export function validateUser() {
    try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        return true;
    } catch {
        return false;
    }
}