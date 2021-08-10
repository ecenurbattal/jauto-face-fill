import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { createSubmission, getFormQuestions } from './services/jotform';
import VideoInput from '../src/components/VideoInput/VideoInput';
import { loadModels } from '../src/services/faceapi';
import NonrecognizeAlert from './components/NonrecognizeAlert/NonrecognizeAlert';
import { getIds, setQuestionsArray, setSubmissionArray, setUserInfo } from './utils/dbform';

function App() {

  const jotform = window.JFCustomWidget;
  const [fields,setFields] = useState();
  const [widgetFormFields,setWidgetFormFields] = useState();
  const [submission,setSubmission] = useState();
  const [isRecognize, setIsRecognize] = useState(false);
  const [description,setDescription] = useState();
  const [newUserInfo,setNewUserInfo] = useState(
    // [{name:'first',value:'Ece Nur'},
    // {name:'last',value:'Battal'},
    // {name:'email',value:'ecenurbattal@gmail.com'},
    // {name:'full',value:'5343107823'}]
  );

  const submissionLabels = useMemo(() => {
    return [
      {name:'name',labels:['first','last']},
      {name:'email',labels:['email']},
      {name:'phoneNumber',labels:['full']},
      {name:'descriptionArray',labels:['descriptionArray']}
    ]
  }, [])


  useEffect(() => {
    const init = async () => {
      await loadModels();
    }
    init();
  }, [])



  useEffect(() => {
    const init = async () => {
      try {
        const {data} = await getFormQuestions(process.env.REACT_APP_JOTFORM_DBFORM_ID);
        console.log(data)
        setFields(setQuestionsArray(data.content,submissionLabels))
      } catch (error) {
        console.log(error)
      }
    }
    init();
  },[submissionLabels])


  useEffect(() => {
    //console.log('fields',fields)
    if(!!fields && !!newUserInfo){
      
      //console.log('user info',newUserInfo)
      setSubmission(setSubmissionArray(fields,newUserInfo))
    }
  },[fields,newUserInfo])



  useEffect(() => {
    if(!!submission){
      const init = async () => {
        try {
          const {data} = await createSubmission(process.env.REACT_APP_JOTFORM_DBFORM_ID,submission)
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
      init();
    }
  },[submission])



  useEffect(() => {
    jotform.subscribe("ready", async (form) => {
      //console.log(form)
      try {
        const {data} = await getFormQuestions(form.formID)
        setWidgetFormFields(setQuestionsArray(data.content,submissionLabels))
      } catch (error) {
        console.log(error)
      }
      // jotform.setFieldsValueById([
      //   {
      //     id: '5',
      //     value: 'ecenurbattal@gmail.com'
      //   },
      //   {
      //     id: '4',
      //     value: 'Ece Nur Battal'
      //   },
      //   {
      //     id: '6',
      //     value: '5343107823'
      //   },
      //   {
      //     id: '7',
      //     items: [{ key: 'city', value: 'sdfkdsşlgds' }, { key: 'state', value: 'dsşlgjkdsl' }]
      //   }
      // ])
    })

    //subscribe to submit event
    jotform.subscribe("submit", function () {
      console.log('submit edildi')
        jotform.getFieldsValueById(getIds(widgetFormFields),(content) => {
          console.log('get',content)
          if(isRecognize) setNewUserInfo(setUserInfo(content.data,description))
          //jotform.sendSubmit(content);
        })
    });
  }, [description, isRecognize, jotform, submissionLabels, widgetFormFields])


  const handleRecognize = (isRecognize) => {
    setIsRecognize(isRecognize)
  }


  return (
    <div className="App">
      {!isRecognize ? <VideoInput setDescription={setDescription} onRecognize={handleRecognize} /> : <NonrecognizeAlert />}
    </div>
  );
}

export default App;
