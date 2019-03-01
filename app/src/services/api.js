import axios from "axios";
import { API_BASE } from "../Constants";

const api = axios.create({
  baseURL: API_BASE
});

export default api;
