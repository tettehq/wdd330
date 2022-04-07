import { makeRequest } from "./authHelpers.js";

makeRequest("login", "POST", {
    password: "user1",
    email: "user1@gmail.com"
});