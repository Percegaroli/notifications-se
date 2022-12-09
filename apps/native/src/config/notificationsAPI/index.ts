import axios from "axios";

export const notificationsAPI = axios.create({
  baseURL: "192.168.0.39:3000",
});
