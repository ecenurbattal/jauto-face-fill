import './App.css';
import { useEffect, useState } from 'react';
import { getFormQuestions, getForms } from './services/jotform';
import VideoInput from '../src/components/VideoInput/VideoInput';
import {loadModels} from '../src/services/faceapi';

function App() {

  
  const [fields,setFields] = useState();
  // const subLabels = [{
  //   name:['first,last'],
    
  // }]

  // const submissionLabels = {
  //   name:['first,last'],
  //   email:[''],
  //   phoneNumber:['full'],
  //   address:['addr_line1','addr_line2','city','country','postal','state'],
  //   descriptionArray:['']
  // }

  // const [queryString,setQueryString] = useState('?');

  useEffect(() => {
    const init = async () => {
      await loadModels();
    }
    init();
  }, [])

  // useEffect(() => {
    
  //     console.log('query',queryString)
    
  // },[queryString])


  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const {data} = await getForms();
  //       console.log("Forms",data)
  //       let temp = `${queryString}&${submissionLabels.keys[0]}[first]`
  //       console.log(temp)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   init();
  // },[submissionLabels])

  useEffect(() => {
    const init = async () => {
      try {
        const {data} = await getFormQuestions(process.env.REACT_APP_JOTFORM_DBFORM_ID);
        console.log("Questions",Object.values(data.content))
        //let array = [];
        const submissionLabels = ['name','email','phoneNumber'];
        setFields(Object.values(data.content).forEach((item) => {
          if(submissionLabels.some((label) => (
            label === item.name
          ))){
            return item
          }
        }))
      } catch (error) {
        console.log(error)
      }
    }
    init();
  },[])

  useEffect(() => {
    console.log(fields)
  },[fields])

  const [isRecognize,setIsRecognize] = useState(false);

  const handleRecognize = (isRecognize) => {
    setIsRecognize(isRecognize)
  }

  const jotform = window.JFCustomWidget;

  useEffect(() => {
    jotform.subscribe("ready", (form) => {
      console.log(form)
      jotform.setFieldsValueById([
        {
          id:'5',
          value:'ecenurbattal@gmail.com'
        },
        {
          id:'4',
          value:''
        },
        {
          id:'6',
          value:'5343107823'
        },
        {
          id:'7',
          items:[{key:'city',value:'sdfkdsşlgds'},{key:'state',value:'dsşlgjkdsl'}]
        }
      ])
    })

    //subscribe to submit evetn
    jotform.subscribe("submit", function(data){
      console.log('submit edildi',data)
      //prepare your data
      // var data = {}
      // //check validity
      // if(photo.src.length === 0 || photo.src.match('placekitten')!==null) {
      //   data.valid = false
      // } else {
      //   data.valid = true,
      //   data.value = photo.src
      // }

      // jotform.sendSubmit(data);
  });
  },[jotform])


  // useEffect(() => {
  //   function isItemInArray(array, item) {
  //     for (var i = 0; i < array.length; i++) {
  //         // This if statement depends on the format of your array
  //         if (array[i][0] === item[0] && array[i][1] === item[1]) {
  //             array.splice(i,1);   // Found it
  //             return array;
  //         }
  //     }
  //     return;   // Not found
  //   }
  //   const arr = [1,2,3,[4,5],6,7,[8,9,10]];
  //   console.log(isItemInArray(arr,[4,5]))
  // },[])


  return (
    <div className="App">
     {!isRecognize ?  <VideoInput onRecognize={handleRecognize}/> : <p>Merhaba</p>}
    </div>
  );
}

export default App;
