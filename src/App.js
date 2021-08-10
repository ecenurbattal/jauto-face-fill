import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { createSubmission, getFormQuestions } from './services/jotform';
import VideoInput from '../src/components/VideoInput/VideoInput';
import { loadModels } from '../src/services/faceapi';
import NonrecognizeAlert from './components/NonrecognizeAlert/NonrecognizeAlert';
<<<<<<< HEAD
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
=======
import RecognizeAlert from './components/RecognizeAlert/RecognizeAlert';

function App() {


  const [fields, setFields] = useState();
  // const subLabels = [{
  //   name:['first,last'],

  // }]
>>>>>>> 3426b6601c939f83c9bae5326d7f1d106633d352

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



  /* useEffect(() => {
    const init = async () => {
      try {
<<<<<<< HEAD
        const {data} = await getFormQuestions(process.env.REACT_APP_JOTFORM_DBFORM_ID);
        console.log(data)
        setFields(setQuestionsArray(data.content,submissionLabels))
=======
        const { data } = await getFormQuestions(process.env.REACT_APP_JOTFORM_DBFORM_ID);
        console.log("Questions", Object.values(data.content))
        //let array = [];
        const submissionLabels = ['name', 'email', 'phoneNumber'];
        setFields(Object.values(data.content).forEach((item) => {
          if (submissionLabels.some((label) => (
            label === item.name
          ))) {
            return item
          }
        }))
>>>>>>> 3426b6601c939f83c9bae5326d7f1d106633d352
      } catch (error) {
        console.log(error)
      }
    }
    init();
<<<<<<< HEAD
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
=======
  }, [])

  useEffect(() => {
    console.log(fields)
  }, [fields]) */
  const [initialRender, setInıtialRender] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [isRecognize, setIsRecognize] = useState(false);

  let onRecognize;

  useEffect(() => {
    if (initialRender) {
      setInıtialRender(false)
    } else {
      setIsRecognize(onRecognize);
    }
  }, [pressed]);


  const handleRecognize = (isRecognize) => {

    // setIsRecognize(isRecognize);

    onRecognize = isRecognize;
    // setPressed(true);
    setPressed(true)



  }

  const jotform = window.JFCustomWidget;

  useEffect(() => {
    jotform.subscribe("ready", (form) => {
      console.log(form)
      jotform.setFieldsValueById([
        {
          id: '5',
          value: 'doki9706@gmail.com'
        },
        {
          id: '4',
          value: ''
        },
        {
          id: '6',
          value: '5343107823'
        },
        {
          id: '7',
          items: [{ key: 'city', value: 'sdfkdsşlgds' }, { key: 'state', value: 'dsşlgjkdsl' }]
>>>>>>> 3426b6601c939f83c9bae5326d7f1d106633d352
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
<<<<<<< HEAD
      {!isRecognize ? <VideoInput setDescription={setDescription} onRecognize={handleRecognize} /> : <NonrecognizeAlert />}
    </div>
=======
      {pressed ? (isRecognize ? <>< RecognizeAlert /></> : <><NonrecognizeAlert /></>
      ) : console.log("initial render=true")}

      <VideoInput onRecognized={handleRecognize} />
    </div >
>>>>>>> 3426b6601c939f83c9bae5326d7f1d106633d352
  );
}

export default App;
