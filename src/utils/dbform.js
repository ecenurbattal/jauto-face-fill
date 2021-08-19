export const setQuestionsArray = (dbContent,submissionLabels) => {
    let array = [];
    Object.values(dbContent).forEach((item) => {
        if(submissionLabels.some((label) => (
          label.name === item.name
        ))){
          array.push({
            qid:item.qid,
            name:item.name,
            sub_labels:submissionLabels.filter((label) => label.name === item.name)[0].labels
          })
        }
    })
    return array;
}


export const parseSubmissions = (submissions,submissionLabels) => {
    let submissionsArray = [];
    let submissionObject = {};
    submissions.forEach((submission) => {
        Object.values(submission.answers).forEach((answer) => {
            if(submissionLabels.some((label) => (
                label.name === answer.name
            ))){
                submissionObject[`${answer.name}`] = answer.name === 'descriptionArray' ? Object.values(answer.answer).toString() : Object.values(answer.answer).toString().replaceAll(',',' ')
            }
        })
        !!(submissionObject) && submissionsArray.push({...submissionObject,id:submission.id})
        submissionObject = {};
    })
    return submissionsArray;
}

export const setFormFieldValues = (recognizedUser,widgetFormFields) => {
    let user = Object.entries(recognizedUser);
    let valueArray = [];
    let fieldObject = {};
    user.forEach((item) => {
        widgetFormFields.forEach((field) => {
            if(item[0]===field.name){
                fieldObject['id']=field.qid
                fieldObject['value']=item[1]
            }
        })
        !!(fieldObject) && valueArray.push(fieldObject)
        fieldObject = {}
    })
    return valueArray;
}

export const getIds = (fieldsArray) => {
    return fieldsArray.map((field) => (
        String(field.qid)
    ))
}

export const returnIndex = (field) => {
    if(field.sub_labels){
      return field.sub_labels.map((label) => `${field.qid}_${label}`)
    } 
}

export const setSubmissionArray = (fields,values) => {
    const temp ={};
    fields.forEach((field) => {
      returnIndex(field).forEach((index) => {
        temp[index] = values.filter((value) => value.name === index.substr(index.indexOf('_')+1,index.length))[0].value
      })
    })
    return temp;
}

export const setUserInfo = (data,description) => {
    let array = [];
    data.forEach((item) => {
        array.push({name:'descriptionArray',value:description})
        switch (item.type) {
            case 'control_fullname':
                var name = item.value.replace(/^\s+|\s+$/g, '');
                name = name.split(/\s+/g);
                if (name.length === 3) {
                    array.push({name:'first',value:name[0] + ' ' + name[1]})
                    array.push({name:'last',value:name[2]})
                } else {
                    array.push({name:'first',value:name[0]})
                    array.push({name:'last',value:name[1]})
                }
                break;
            case 'control_email':
                array.push({name:'email',value:item.value})
                break;
            case 'control_phone':
                array.push({name:'full',value:item.value})
                break;
            default:
                break;
        }
    })
    return array;
}


export const createDbFormData = (dbFormDataConstants) => {
    const fd = new FormData();
    dbFormDataConstants.questions.forEach((item,index) => {
        fd.append(`questions[${index}][type]`,item.type);
        fd.append(`questions[${index}][text]`,item.text);
        fd.append(`questions[${index}][order]`,index);
        fd.append(`questions[${index}][name]`,item.name);
    })
    Object.entries(dbFormDataConstants.properties).forEach((item) => {
        fd.append(`properties[${item[0]}]`,item[1])
    })
    return fd;
}