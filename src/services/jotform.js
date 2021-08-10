import axios from 'axios';

const instance = axios.create({
    baseURL:process.env.REACT_APP_JOTFORM_API_URL,
    params:{
        apiKey:process.env.REACT_APP_JOTFORM_API_KEY,
        debug:true
    }
})

export const getFormQuestions = (formId) => {
    return instance.get(`/form/${formId}/questions`);
}

export const createSubmission = (formId,submission) => {
    return instance.post(`/form/${formId}/submissions`,submission)
}

export const getSubmissions = (formId) => {
    return instance.get(`/form/${formId}/submissions`);
}