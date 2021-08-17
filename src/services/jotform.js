import axios from 'axios';

const instance = axios.create({
    baseURL:process.env.REACT_APP_JOTFORM_API_URL,
    params:{
        apiKey:localStorage.getItem('apiKey'),
        debug:true
    }
})

export const getFormQuestions = (formId) => {
    return instance.get(`/form/${formId}/questions`)
}

export const getForms = () => {
    return instance.get(`/user/forms`)
}

// export const getWidgetFormQuestions = (formId) => {
//     return axios.get(`https://api.jotform.com/form/${formId}/questions`,{
//         params:{
//             apiKey:localStorage.getItem('apiKey')
//         }
//     });
// }

export const createSubmission = (formId,submission) => {
    return instance.post(`/form/${formId}/submissions`,submission)
}

export const getSubmissions = (formId) => {
    //console.log('apiKey',localStorage.getItem('apiKey'))
    return instance.get(`/form/${formId}/submissions`);
}

export const createForm = (form) => {
    return instance.post('/form',form)
}