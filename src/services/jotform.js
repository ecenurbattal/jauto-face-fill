import axios from 'axios';

const instance = axios.create({
    baseURL:process.env.REACT_APP_JOTFORM_API_URL,
    params:{
        apiKey:process.env.REACT_APP_JOTFORM_API_KEY,
        debug:true
    }
})

export const getForms = () => {
   return instance.get('/user/forms');
}

export const getFormQuestions = (formId) => {
    return instance.get(`/form/${formId}/questions`);
}