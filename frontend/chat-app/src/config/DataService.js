import axios from "axios"; 
export var BASE_URL = "http://localhost:3002";


export const DataService = axios.create({
    baseURL: BASE_URL,
  });