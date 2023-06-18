import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function splitImage(imageUrl) {
    const response = await axios.post(`${BASE_URL}/images/split`, {
        imageUrl,
    });
    return response.data;
}

export async function verifyPuzzles(puzzles) {
    const response = await axios.post(`${BASE_URL}/images/verify`, puzzles);
    return response.data;
}
