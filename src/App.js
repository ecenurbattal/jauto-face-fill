import './App.css';
import { useEffect, useState } from 'react';
import { createForm, createSubmission, getFormQuestions, getForms } from './services/jotform';
import VideoInput from '../src/components/VideoInput/VideoInput';
import { loadModels } from '../src/services/faceapi';
import NonrecognizeAlert from './components/NonrecognizeAlert/NonrecognizeAlert';
import { createDbFormData, getIds, setFormFieldValues, setQuestionsArray, setSubmissionArray, setUserInfo } from './utils/dbform';
import RecognizeAlert from './components/RecognizeAlert/RecognizeAlert';
import { submissionLabels } from './constants/submissionLabels';
import { dbFormData } from './constants/dbFormData';

function App() {

  const jotform = window.JFCustomWidget;
  const [fields, setFields] = useState();
  const [widgetFormFields, setWidgetFormFields] = useState();
  const [submission, setSubmission] = useState();
  const [isRecognize, setIsRecognize] = useState(false);
  const [description, setDescription] = useState();
  const [initialRender, setInıtialRender] = useState(true);
  const [isDetect, setIsDetect] = useState(false);
  const [recognizedUser, setRecognizedUser] = useState();
  const [onRecognize, setOnRecognize] = useState(null);
  const [dbFormId,setDbFormId] = useState();
  const [newUserInfo, setNewUserInfo] = useState();


  useEffect(() => {
    const init = async () => {
      await loadModels();
    }
    init();
  }, [])



  useEffect(() => {
    if (initialRender) {
      setInıtialRender(false)
    } else {
      setIsRecognize(onRecognize);
    }
  }, [onRecognize, initialRender]);

  const handleRecognize = (isRecognize) => {
    if (!!isRecognize) {//if face was recognized after not recognized at the first time then show again the success alert
      setOnRecognize(isRecognize)
    }
    setIsDetect(true)
  }

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getForms();
        const dbForm = response.data.content.filter((form) => form.status !== 'DELETED' && form.title === 'Jauto Face Fill Database Form');
        if(!(dbForm.length)){
          const { data } = await createForm(createDbFormData(dbFormData))
          setDbFormId(data.content.id)
        } else {
          setDbFormId(dbForm[0].id)
        }
      } catch (error) {
        console.log(error)
      }
    }
    init();
  }, [])

  useEffect(() => {
    const init = async () => {
      if(!!dbFormId){
        try {
          const { data } = await getFormQuestions(dbFormId);
          setFields(setQuestionsArray(data.content, submissionLabels))
        } catch (error) {
          console.log(error)
        }
      }
    }
    init();
  }, [dbFormId])


  useEffect(() => {
    if (!!fields && !!newUserInfo) {
      setSubmission(setSubmissionArray(fields, newUserInfo))
    }
  }, [fields, newUserInfo])



  useEffect(() => {
    if (!!submission && !!dbFormId) {
      const init = async () => {
        try {
          await createSubmission(dbFormId, submission)
        } catch (error) {
          console.log(error)
        }
      }
      init();
    }
  }, [submission,dbFormId])

  useEffect(() => {
    if (isDetect && isRecognize) {

      console.log('fieldValues', setFormFieldValues(recognizedUser, widgetFormFields))
      jotform.setFieldsValueById(setFormFieldValues(recognizedUser, widgetFormFields))

    }
  }, [isDetect, isRecognize, jotform, recognizedUser, widgetFormFields])




  useEffect(() => {
    jotform.subscribe("ready", (form) => {
      localStorage.setItem('apiKey',jotform.getWidgetSetting('apiKey'))
      const getQuestions = async () => {
        try {
          const {data} = await getFormQuestions(form.formID)
          setWidgetFormFields(setQuestionsArray(data.content, submissionLabels))
        } catch (error) {
          console.log(error)
        }
      }

      getQuestions();
    })

    //subscribe to submit event
    jotform.subscribe("submit", function () {
      jotform.getFieldsValueById(getIds(widgetFormFields), (content) => {
        if (isDetect && !isRecognize) setNewUserInfo(setUserInfo(content.data, description))
        jotform.sendSubmit(content);
      })
    });
  }, [description, isRecognize, jotform, isDetect, widgetFormFields, recognizedUser])




  return (
    <div className="App">
      {isDetect && (isRecognize ? <>< RecognizeAlert /></> : <><NonrecognizeAlert /></>
      )}
      <VideoInput 
      dbFormId={dbFormId} 
      setDescription={setDescription} 
      onRecognized={handleRecognize} 
      setRecognizedUser={setRecognizedUser} 
      recognizedUser={recognizedUser}
      />
    </div >
  );
}

export default App;
