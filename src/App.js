import './App.css';
import { useEffect, useState } from 'react';
import { createSubmission, getFormQuestions } from './services/jotform';
import VideoInput from '../src/components/VideoInput/VideoInput';
import { loadModels } from '../src/services/faceapi';
import NonrecognizeAlert from './components/NonrecognizeAlert/NonrecognizeAlert';
import { getIds, setQuestionsArray, setSubmissionArray, setUserInfo } from './utils/dbform';
import RecognizeAlert from './components/RecognizeAlert/RecognizeAlert';
import { submissionLabels } from './constants/submissionLabels';

function App() {

  const jotform = window.JFCustomWidget;
  const [fields,setFields] = useState();
  const [widgetFormFields,setWidgetFormFields] = useState();
  const [submission,setSubmission] = useState();
  const [isRecognize, setIsRecognize] = useState(false);
  const [description,setDescription] = useState();
  const [initialRender, setInıtialRender] = useState(true);
  const [isDetect, setIsDetect] = useState(false);
  const [recognizedUser,setRecognizedUser] = useState();
  const [newUserInfo,setNewUserInfo] = useState(
    // [{name:'first',value:'Ece Nur'},
    // {name:'last',value:'Battal'},
    // {name:'email',value:'ecenurbattal@gmail.com'},
    // {name:'full',value:'5343107823'}]
  );

  // const submissionLabels = useMemo(() => {
  //   return [
  //     {name:'name',labels:['first','last']},
  //     {name:'email',labels:['email']},
  //     {name:'phoneNumber',labels:['full']},
  //     {name:'descriptionArray',labels:['descriptionArray']}
  //   ]
  // }, [])


  useEffect(() => {
    const init = async () => {
      await loadModels();
    }
    init();
  }, [])


  let onRecognize;

  useEffect(() => {
    if (initialRender) {
      setInıtialRender(false)
    } else {
      setIsRecognize(onRecognize);
    }
  }, [initialRender, onRecognize, isDetect]);

  const handleRecognize = (isRecognize) => {

    // setIsRecognize(isRecognize);

    onRecognize = isRecognize;
    // setIsDetect(true);
    setIsDetect(true)
  }

  useEffect(() => {
    const init = async () => {
      try {
        const {data} = await getFormQuestions(process.env.REACT_APP_JOTFORM_DBFORM_ID);
        //console.log(data)
        setFields(setQuestionsArray(data.content,submissionLabels))
      } catch (error) {
        console.log(error)
      }
    }
    init();
  },[])


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
          console.log('submission',data)
        } catch (error) {
          console.log(error)
        }
      }
      init();
    }
  },[submission])

  useEffect(() => {
    if(isDetect && isRecognize){
        let value = recognizedUser.map((user) => (
          {
            label:user[0],
            value:user[1]
          }
        ))
        console.log('recognizedUser',recognizedUser)
        console.log('value',value)
        //jotform.setFieldsValueByLabel(value)
        jotform.setFieldsValueById([
          {
            id:'6',
            value:'5343107823'
          }
        ])
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
          // ])
    }
  },[isDetect, isRecognize, jotform, recognizedUser])


  // useEffect(() => {
  //   console.log('isDetect',isDetect)
  //   console.log('isRecognize',isRecognize)
  // },[isDetect,isRecognize])



  useEffect(() => {
    // console.log('isDetect',isDetect)
    //  console.log('isRecognize',isRecognize)
    jotform.subscribe("ready", (form) => {
      //console.log(form)
     const getQuestions = async () => {
        try {
          const {data} = await getFormQuestions(form.formID)
          console.log(data)
          setWidgetFormFields(setQuestionsArray(data.content,submissionLabels))
          console.log('widgetFormField',setQuestionsArray(data.content,submissionLabels))
        } catch (error) {
          console.log(error)
        }
     }
     
    getQuestions();
    //   if(isDetect && isRecognize){
    //     // let value = recognizedUser.map((user) => (
    //     //   {
    //     //     label:user[0],
    //     //     value:user[1]
    //     //   }
    //     // ))
    //     // jotform.setFieldValueByLabel(value)
    //   // //   console.log('value',value)
    //   console.log('ifin içindeyim')
    //     jotform.setFieldsValueById([
    //       {
    //         id: '5',
    //         value: 'ecenurbattal@gmail.com'
    //       },
    //       {
    //         id: '4',
    //         value: 'Ece Nur Battal'
    //       },
    //       {
    //         id: '6',
    //         value: '5343107823'
    //       },
    //     ])
    //   }
    })

    //subscribe to submit event
    jotform.subscribe("submit", function () {
      console.log('submit edildi')
        jotform.getFieldsValueById(getIds(widgetFormFields),(content) => {
          //console.log('get',content)
          if(isDetect && !isRecognize) setNewUserInfo(setUserInfo(content.data,description))
          jotform.sendSubmit(content);
        })
    });
  }, [description, isRecognize, jotform, isDetect, widgetFormFields, recognizedUser])


  // const handleRecognize = (isRecognize) => {
  //   setIsRecognize(isRecognize)
  // }


  return (
    // <div className="App">
    //   {!isRecognize ? <VideoInput setDescription={setDescription} onRecognize={handleRecognize} /> : <NonrecognizeAlert />}
    // </div>
    <div className="App">
      {isDetect && (isRecognize ? <>< RecognizeAlert /></> : <><NonrecognizeAlert /></>
      )}

      <VideoInput setDescription={setDescription} onRecognized={handleRecognize} setRecognizedUser={setRecognizedUser} />
    </div >
  );
}

export default App;
