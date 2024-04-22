// User authentication
import { jwtDecode } from "jwt-decode";
import http from "../http";


// function to check whether account is admin
// HOW IT WORKS:
// call the api to get user details, check if the account_type attribute is "hr"
export async function validateAdmin() {
    try {
        const userRes = await http.get("/users/me");
        console.log("Response from /users/me:", userRes);
        const userData = userRes.data.data;
        console.log("User data to check HR account_type:", userData);
        return userData.account_type === "hr";
    } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
        return false;
    }
}


// function to see whether there is an account currently logged in
// how it works:
// check whether there is an access token stored in local storage. if there is, return true
// which means that the application currently has a logged in user. if not, false if no user is logged in.
export function validateUser() {
    try {
        const token = localStorage.getItem('accessToken');
        const decoded = jwtDecode(token);
        return true;
    } catch {
        return false;
    }
}