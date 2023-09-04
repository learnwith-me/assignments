import axios from "axios";
const apiBaseURL = 'https://dummyjson.com/products';


export const fetchDummyData = url => {
    return axios.get(`${apiBaseURL}`);
}
