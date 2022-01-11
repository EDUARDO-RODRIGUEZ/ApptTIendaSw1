import axios from "axios";

export const apiAzure = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': ''
    },
    baseURL: 'https://brazilsouth.api.cognitive.microsoft.com/text/analytics/v3.0',
});
